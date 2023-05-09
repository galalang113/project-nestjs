import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'src/utils/logger/log-console.config'
import { AppConfigDto } from '../dto/config.dto'
import { AppShutdownService } from './app-shutdown.service'
import _ = require('lodash')
@Injectable()
export class AppConfigService {
	private appConfig: AppConfigDto
	private logger: Logger

	constructor(private configService: ConfigService, private appShutdown: AppShutdownService) {
		this.logger = new Logger(AppConfigService.name)
		this.logger.info('Config', this.filePath)
		this.load()
	}

	async load() {
		try {
			if (!this.filePath) throw new Error('File path not found!!')
			const url_path = `./../constants/${this.filePath}`
			const file = await import(url_path)

			this.appConfig = _.cloneDeep(file).appConfigInit

			if (this.appConfig.redis) {
				this.appConfig.redis.uri = this.configService.get<string>('REDIS_URI')
				this.appConfig.redis.ttl = Number(this.configService.get<number>('REDIS_TTL')) || 30
			}

			if (this.appConfig.mongoose) {
				this.appConfig.mongoose.uri = this.configService.get<string>('MONGODB_URL')
			}

			if (this.appConfig.rabbitmq) {
				this.appConfig.rabbitmq.uri = this.configService.get<string>('RABBITMQ_URI')
			}
			// console.log('appConfigInit', this.appConfig)
		} catch (error) {
			this.logger.error('onModuleInit', 'Init error', error)
			this.appShutdown.shutdown()
		}
	}

	onShutdown() {
		this.appShutdown.shutdown()
	}

	get filePath() {
		return this.configService.get<string>('SETTING_FILE_PATH')
	}

	get env() {
		return {}
	}

	get redis() {
		return this.appConfig.redis
	}
	get mongoose() {
		return this.appConfig.mongoose
	}
	get rabbitmq() {
		return this.appConfig.rabbitmq
	}
}
