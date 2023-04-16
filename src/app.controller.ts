import { ApiTags } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@ApiTags('home')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}
}
