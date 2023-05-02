import { IsNotEmpty } from 'class-validator'

export class AppConfigDto {
	@IsNotEmpty()
	redis: {
		uri: string
		ttl: number
	}

	@IsNotEmpty()
	mongoose: {
		uri: string
	}
}
