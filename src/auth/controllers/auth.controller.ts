import { Body, Controller, Post, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LoginUserDto } from 'src/user/dto/user.dto'
import { AuthService } from '../services/auth.service'
import { RedisService } from 'src/redis/services/redis.service'
import { REDIS_NAME } from 'src/redis/constants/redis.constant'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService, private readonly redisService: RedisService) {}
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

	@Get('set-cache')
	async setCache() {
		await this.redisService.set(REDIS_NAME.access_token, 'đẹp trai')
		return true
	}

	@Get('get-cache')
	async getCache() {
		return await this.redisService.get(REDIS_NAME.access_token)
	}
}
