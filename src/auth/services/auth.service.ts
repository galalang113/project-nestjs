import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/services/user.service'

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}
	async login(loginUserDto: any) {
		const user = await this.userService.findByLogin(loginUserDto)
		const token = await this._createToken(user)
		return {
			email: user.email,
			...token,
		}
	}

	async validateUser(email) {
		return await this.userService.findByEmail(email)
	}

	private async _createToken({ email }, isSecondFactorAuthenticated = false, refresh = true) {
		const accessToken = this.jwtService.sign({
			email,
			isSecondFactorAuthenticated,
		})
		if (refresh) {
			const refreshToken = this.jwtService.sign(
				{ email },
				{
					secret: process.env.SECRETKEY_REFRESH,
					expiresIn: process.env.EXPIRESIN_REFRESH,
				},
			)
			await this.userService.update(
				{ email: email },
				{
					refreshToken: refreshToken,
				},
			)
			return {
				expiresIn: process.env.EXPIRESIN,
				accessToken,
				refreshToken,
				expiresInRefresh: process.env.EXPIRESIN_REFRESH,
			}
		} else {
			return {
				expiresIn: process.env.EXPIRESIN,
				accessToken,
			}
		}
	}

	async register(userDto: any) {
		const user = await this.userService.create(userDto)
		const token = await this._createToken(user)
		return {
			email: user.email,
			...token,
		}
	}

	async refresh(refresh_token) {
		try {
			const payload = await this.jwtService.verify(refresh_token, {
				secret: process.env.SECRETKEY_REFRESH,
			})
			const user = await this.userService.getUserByRefresh(refresh_token, payload.email)
			const token = await this._createToken(user, true, false)
			return {
				email: user.email,
				...token,
			}
		} catch (e) {
			throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
		}
	}
}
