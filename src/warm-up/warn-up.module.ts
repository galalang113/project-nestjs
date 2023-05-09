import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { redisStore } from 'cache-manager-redis-yet'
import { Connection } from 'mongoose'
import { AppConfigModule } from 'src/app-config/app-config.module'
import { AppConfigService } from 'src/app-config/services/app-config.service'
import { Logger } from 'src/utils/logger/log-console.config'
import { RabbitMQClientModule } from 'src/rabbitmq/rabbitmq.module'

const moduleMetaData = {
	imports: [
		ConfigModule.forRoot(),
		RabbitMQClientModule,
		MongooseModule.forRootAsync({
			imports: [AppConfigModule],
			useFactory: async (appConfigService: AppConfigService) => {
				return {
					uri: appConfigService.mongoose.uri,
					connectionFactory: (connection: Connection) => {
						const logger = new Logger(MongooseModule.name)
						if (connection.readyState >= 1) logger.info('forRootAsync', 'Mongoose connected!!!')
						connection.on('reconnected', () => logger.info('forRootAsync', 'reconnected -> Mongoose Connected!!!'))
						connection.on('disconnected', () => logger.warn('forRootAsync', 'disconnected -> Mongoose Disconnected!!!'))
						connection.on('error', error => logger.error('forRootAsync', '', error))
						return connection
					},
					useNewUrlParser: true,
					useUnifiedTopology: true,
				}
			},
			inject: [AppConfigService],
		}),
		CacheModule.registerAsync({
			imports: [AppConfigModule],
			useFactory: async (appConfigService: AppConfigService) => {
				const logger = new Logger(CacheModule.name)
				let isLogError = true

				try {
					const store = await redisStore({
						url: appConfigService.redis.uri,
						ttl: appConfigService.redis.ttl,
					})

					const ping = await store.client.PING()
					if (ping === 'PONG') logger.info('PONG', 'Redis connected!!!')

					store.client.on('error', function (error) {
						if (isLogError) {
							logger.error('registerAsync', '', error)
							isLogError = false
							setTimeout(() => (isLogError = true), 5 * 1000)
						}
					})
					store.client.on('connect', async () => {
						try {
							const ping = await store.client.PING()
							if (ping === 'PONG') {
								logger.info('registerAsync', 'Redis connected!!!')
							}
						} catch (err) {}
					})
					return {
						store: store,
					}
				} catch (err) {
					logger.error('registerAsync', 'Redis connect fail', err)
				}
			},
			isGlobal: true,
			inject: [AppConfigService],
		}),
	],
}

@Module(moduleMetaData)
export class WarmUpModule {}