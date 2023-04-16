import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard'
import { UserService } from '../services/user.service'

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	async getProfile() {
		return this.userService.findAll()
	}
}
