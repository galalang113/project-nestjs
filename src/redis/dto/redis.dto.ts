import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class RedisEnvironmentVariables {
	/**
	 * Redis
	 */
	@IsNotEmpty()
	@IsString()
	REDIS_HOST: string

	@IsNotEmpty()
	@IsString()
	REDIS_PORT: string

	@IsOptional()
	@IsString()
	REDIS_PASSWORD?: string
}
