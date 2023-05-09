import { ConsumeMessage, Channel } from 'amqplib'
import { ConsumerBase } from 'src/app-config/interface/app-config.interface'
import { Logger } from 'src/utils/logger/log-console.config'

export class WebhookUninstallAppConsumer implements ConsumerBase {
	public async onMessage(payload: any, msg: ConsumeMessage, channel: Channel): Promise<void> {
		const logger = new Logger(WebhookUninstallAppConsumer.name)
		logger.info('onMessage', 'webhooks' + JSON.stringify(payload))
		channel.ack(msg)
	}
}
