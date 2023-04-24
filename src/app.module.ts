import { CacheModule } from '@nestjs/cache-manager'
import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { redisStore } from 'cache-manager-redis-yet'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('MONGODB_URL'),
			}),
			inject: [ConfigService],
		}),
		CacheModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				return {
					store: await redisStore({
						url: configService.get<string>('REDIS_URI'),
						username: configService.get<string>('REDIS_USERNAME'),
						password: configService.get<string>('REDIS_PASSWORD'),
						ttl: Number(configService.get<string>('REDIS_TTL')),
					}),
				}
			},
			isGlobal: true,
			inject: [ConfigService],
		}),
		AuthModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService, Logger],
})
export class AppModule {}
