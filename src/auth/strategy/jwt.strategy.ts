import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { HttpException, Injectable, HttpStatus } from '@nestjs/common'
import { AuthService } from '../services/auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.SECRETKEY,
		})
	}

	async validate({ email }) {
		const user = await this.authService.validateUser(email)
		if (!user) {
			throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
		}
		return user
	}
}
