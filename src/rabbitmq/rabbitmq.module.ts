import { Module } from '@nestjs/common'
import { RabbitMQClientService } from './services/rabbitmq-connection.service'
import { AppConfigModule } from 'src/app-config/app-config.module'

@Module({
	imports: [AppConfigModule],
	providers: [RabbitMQClientService],
	exports: [RabbitMQClientService],
})
export class RabbitMQClientModule {}
