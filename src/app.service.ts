import { Injectable, Logger, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'

@Injectable()
export class AppService implements OnModuleInit, OnApplicationShutdown {
	constructor(private readonly logger: Logger) {
		this.logger = new Logger(AppService.name)
	}

	onModuleInit() {
		this.logger.warn('INIT MAIN APP')
	}

	onApplicationShutdown(signal?: string) {
		this.logger.warn(`SERVER IS SHUTTING DOWN...! Signal ${signal}`)
	}
}
