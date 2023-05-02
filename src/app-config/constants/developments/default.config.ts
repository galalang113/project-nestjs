import { AppConfigDto } from 'src/app-config/dto/config.dto'

export const appConfigInit: AppConfigDto = {
	redis: {
		uri: '',
		ttl: 30,
	},
	mongoose: {
		uri: '',
	},
}
