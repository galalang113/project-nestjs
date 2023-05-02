import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import { Logger } from './utils/logger/log-console.config'
@Injectable()
export class AppService implements OnModuleInit, OnApplicationShutdown {
	private logger: Logger
	constructor() {
		this.logger = new Logger(AppService.name)
	}

	async onModuleInit() {
		this.logger.info('Init', 'INIT MAIN APP')
	}

	onApplicationShutdown(signal?: string) {
		this.logger.info('Shutdown', `SERVER IS SHUTTING DOWN...! Signal ${signal}`)
		process.exit(1)
	}
}
