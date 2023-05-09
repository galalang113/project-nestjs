import { AppConfigDto } from 'src/app-config/dto/config.dto'

export const appConfigInit: AppConfigDto = {
	redis: {
		uri: '',
		ttl: 30,
	},
	mongoose: {
		uri: '',
	},
	rabbitmq: {
		uri: '',
		prefetch: 1,
		prefix: 'project-nestjs',
		channelOption: {
			messageTtl: 3 * 60 * 1000,
			durable: true,
			expires: 2 * 24 * 60 * 60 * 1000,
			type: 'direct',
		},
		exchangeName: 'project-nestjs_exchange',
		queue: {
			webhook_uninstall: {
				queueName: 'webhook_uninstall_app',
				routingKey: 'webhook_uninstall_app',
				consumerLimit: 1,
				consumerActive: true,
				publisherActive: true,
			},
		},
	},
	moduleServiceActive: {
		mongo: false,
		cron: false,
		rabbitmq: false,
		redis: false,
		initDataApp: false,
		initScriptTags: false,
		mongoQueue: false,
	},
}
