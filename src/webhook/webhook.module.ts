import { Module } from '@nestjs/common'
import { WebhookController } from './controllers/webhook.controller'
import { WebhookService } from './services/webhook.service'
import { RabbitMQClientModule } from 'src/rabbitmq/rabbitmq.module'
import { AppConfigModule } from 'src/app-config/app-config.module'

@Module({
	imports: [RabbitMQClientModule, AppConfigModule],
	controllers: [WebhookController],
	providers: [WebhookService],
	exports: [WebhookService],
})
export class WebhookModule {}
