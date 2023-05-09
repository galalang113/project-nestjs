import { Injectable } from '@nestjs/common'
import { AppConfigService } from 'src/app-config/services/app-config.service'
import { RabbitMQClientService } from 'src/rabbitmq/services/rabbitmq-connection.service'
@Injectable()
export class WebhookService {
	constructor(private rabbitmqClientService: RabbitMQClientService, private appConfigService: AppConfigService) {}
	public async webhook() {
		const { queue } = this.appConfigService.rabbitmq
		this.rabbitmqClientService.publish(queue.webhook_uninstall.routingKey, { data: 'trong dep trai' })
		return 'ok nè'
	}
}
