import { Body, Controller, Post } from '@nestjs/common'
import { LoginUserDto } from 'src/user/dto/user.dto'
import { AuthService } from '../services/auth.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post('login')
	async login(@Body() loginUserDto: LoginUserDto) {
		return await this.authService.login(loginUserDto)
	}

	@Post('refresh')
	async refresh(@Body() body) {
		return await this.authService.refresh(body.refresh_token)
	}

	@Post('register')
	async register(@Body() createUserDto: any) {
		return await this.authService.register(createUserDto)
	}
}
