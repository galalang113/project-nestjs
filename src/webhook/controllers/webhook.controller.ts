import { Controller, Post } from '@nestjs/common'
import { WebhookService } from '../services/webhook.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('webhook')
@Controller('webhook')
export class WebhookController {
	constructor(private readonly webhookService: WebhookService) {}
	@Post()
	async webhook() {
		return await this.webhookService.webhook()
	}
}
