import { Channel, ConsumeMessage } from 'amqplib'
export enum ModuleConnectionName {
	MONGO = 'mongo',
	RABBITMQ = 'rabbitmq',
	REDIS = 'redis',
	CRON = 'cron',
	MONGOQUEUE = 'mongoQueue',
	INITDATAAPP = 'initDataApp',
	INITSCRIPTTAGS = 'initScriptTags',
}
export type IQueue = {
	queueName: string
	routingKey: string
	consumerLimit: number
	consumerActive: boolean
	publisherActive: boolean
}
export type RabbitMQConfiguration = {
	uri: string
	prefix: string
	prefetch: number
	channelOption: {
		exclusive?: boolean | undefined
		durable?: boolean | undefined
		autoDelete?: boolean | undefined
		arguments?: any
		messageTtl?: number | undefined
		expires?: number | undefined
		deadLetterExchange?: string | undefined
		deadLetterRoutingKey?: string | undefined
		maxLength?: number | undefined
		maxPriority?: number | undefined
		type?: 'direct' | 'topic' | 'headers' | 'fanout' | 'match'
	}
	exchangeName: string
	queue: {
		[key: string]: IQueue
	}
}
export type ModuleServiceActiveConfiguration = {
	[key in ModuleConnectionName]: boolean
}
export interface ConsumerBase {
	onMessage(payload: any, msg: ConsumeMessage, channel: Channel): Promise<void>
}
