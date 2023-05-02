import { Module } from '@nestjs/common'
import { AppConfigService } from './services/app-config.service'
import { ConfigModule } from '@nestjs/config'
import { AppShutdownService } from './services/app-shutdown.service'

@Module({
	imports: [ConfigModule],
	providers: [AppConfigService, AppShutdownService],
	exports: [AppConfigService],
})
export class AppConfigModule {}
