import { Injectable } from '@nestjs/common'
import * as amqp from 'amqp-connection-manager'
import { ConsumerBase, IQueue } from 'src/app-config/interface/app-config.interface'
import { AppConfigService } from 'src/app-config/services/app-config.service'
import { Logger } from 'src/utils/logger/log-console.config'
import { WebhookUninstallAppConsumer } from './consumers/webhooks'

@Injectable()
export class RabbitMQClientService {
	private connection: amqp.AmqpConnectionManager
	private channelWrapper: amqp.ChannelWrapper
	private logger = new Logger(RabbitMQClientService.name)

	constructor(private appConfigService: AppConfigService) {
		this.start()
	}

	public async connect(): Promise<boolean> {
		return new Promise(resolve => {
			try {
				this.connection = amqp.connect([this.appConfigService.rabbitmq.uri])
				this.connection.addListener('connect', () => {
					this.logger.info('connect', 'Rabbitmq connected!!!')
					resolve(true)
				})
				this.connection.addListener('disconnect', ({ err }) => {
					this.logger.error('RabbitMQConnection', 'disconnect', err)
					resolve(true)
				})
			} catch (error) {
				resolve(false)
			}
		})
	}

	public async createChanel() {
		if (this.connection) {
			const { channelOption, exchangeName, prefetch } = this.appConfigService.rabbitmq
			this.channelWrapper = this.connection.createChannel({
				json: false,
				setup: (channel: amqp.Channel) => {
					channel.assertExchange(exchangeName, channelOption.type, {
						durable: channelOption.durable,
					})
					channel.prefetch(Number(prefetch))
				},
			})
		}
	}

	public async registerQueue(options: any) {
		if (this.channelWrapper) {
			const { option, queueName, routingKey, exchangeName, isConsumer, onMessage } = options
			this.channelWrapper.addSetup(async (channel: amqp.Channel) => {
				await channel.assertQueue(queueName, option)
				await channel.bindQueue(queueName, exchangeName, routingKey)
				if (isConsumer) {
					await channel.consume(
						queueName,
						msg => {
							if (onMessage && msg) {
								const payload = JSON.parse(msg.content.toString('utf8'))
								onMessage(payload, msg, channel)
							}
						},
						{
							noAck: false,
						},
					)
				}
			})
		}
	}

	public async __wrapPubRegister() {
		if (this.channelWrapper) {
			const { prefix, exchangeName, channelOption, queue } = this.appConfigService.rabbitmq

			for (const key of Object.keys(queue)) {
				const queueName = `${prefix}_${queue[key].queueName}`
				await this.registerQueue({
					exchangeName,
					option: {
						durable: channelOption?.durable || false,
						messageTtl: channelOption.messageTtl || 1000,
					},
					queueName: queueName,
					routingKey: queue[key].routingKey,
					isConsumer: false,
				})
			}
		}
	}

	public async handleConsService(queue: IQueue, _consumer: ConsumerBase) {
		const { prefix, exchangeName, channelOption } = this.appConfigService.rabbitmq
		const queueName = `${prefix}_${queue.queueName}`
		for (let i = 0; i < queue.consumerLimit; i++) {
			this.registerQueue({
				exchangeName,
				option: {
					durable: channelOption?.durable || false,
					messageTtl: channelOption.messageTtl || 1000,
				},
				queueName: queueName,
				routingKey: queue.routingKey,
				isConsumer: true,
				onMessage: _consumer.onMessage,
			})
		}
	}

	public async __wrapConsRegister() {
		if (this.channelWrapper) {
			const { queue } = this.appConfigService.rabbitmq

			//webhook_uninstall_app
			if (queue.webhook_uninstall && queue.webhook_uninstall.publisherActive) {
				const _WHUninstallService = new WebhookUninstallAppConsumer()
				await this.handleConsService(queue.webhook_uninstall, _WHUninstallService)
			}
		}
	}

	public async publish(routingKey: string, payload: unknown) {
		return new Promise((resolve, reject) => {
			if (this.channelWrapper) {
				if (payload) {
					const { exchangeName } = this.appConfigService.rabbitmq
					const payloadStr: string = JSON.stringify(payload)
					const payloadBuf = Buffer.from(payloadStr)
					this.channelWrapper.publish(
						exchangeName,
						routingKey,
						payloadBuf,
						{
							persistent: true,
						},
						(err, ok) => {
							if (err) {
								this.logger.error('publish', '', err)
								reject(false)
							}
							resolve(Boolean(ok))
						},
					)
				}
			}
		})
	}

	public async start() {
		await this.connect()
		await this.createChanel()
		await this.__wrapPubRegister()
		await this.__wrapConsRegister()
	}
}
