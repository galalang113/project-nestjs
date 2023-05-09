import { IsNotEmpty } from 'class-validator'
import { ModuleServiceActiveConfiguration, RabbitMQConfiguration } from '../interface/app-config.interface'

export class AppConfigDto {
	@IsNotEmpty()
	redis: {
		uri: string
		ttl: number
	}

	@IsNotEmpty()
	mongoose: {
		uri: string
	}

	@IsNotEmpty()
	rabbitmq: RabbitMQConfiguration

	@IsNotEmpty()
	moduleServiceActive: ModuleServiceActiveConfiguration
}
