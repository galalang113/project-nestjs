import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { WarmUpModule } from './warm-up/warn-up.module'
import { WebhookModule } from './webhook/webhook.module'

@Module({
	imports: [WarmUpModule, AuthModule, UserModule, WebhookModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
