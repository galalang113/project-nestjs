import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as compression from 'compression'
import * as express from 'express'
import { join } from 'path'
import { AppShutdownService } from './app-config/services/app-shutdown.service'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './utils/filters/http-exception.filter'
import { LoggingInterceptor } from './utils/logger'
import { Logger } from './utils/logger/log-console.config'

async function bootstrap() {
	const server = express()
	const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server), {
		logger: false,
	})

	app.useStaticAssets(join(__dirname, '..', 'public'))

	app.enableShutdownHooks()
	app.useGlobalPipes(new ValidationPipe())
	app.useGlobalInterceptors(new LoggingInterceptor())
	app.useGlobalFilters(new HttpExceptionFilter())
	app.use(compression())
	app.get(AppShutdownService).subscribeToShutdown(() => app.close())

	const options = new DocumentBuilder()
		.setTitle('Project Nestjs')
		.addBearerAuth()
		.setDescription(
			`
      The Project Nestjs APIs documentation
      - 🪲: bug
      - ⌛: doing
      - 🧑‍🔬: to test
      - 🌟: done, haven't tested yet
      - ✅: done, tested
      - 🚫: deprecated
      - 📄: support load more
    `,
		)
		.setVersion('v1.0')
		.build()
	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('api', app, document)

	const logger = new Logger(AppModule.name)
	logger.info('bootstrap', `Server is listening on port ${process.env.PORT || 3000}`)

	await app.listen(process.env.PORT || 3000)
}
bootstrap()
