import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as compression from 'compression'
import { AppModule } from './app.module'
import { LoggingInterceptor } from './utils/logger'
import { Logger } from './utils/logger/log-console.config'
import { AllExceptionFilter } from './utils/filters/all-exception.filter'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: false,
	})

	app.enableShutdownHooks()
	app.useGlobalPipes(new ValidationPipe())
	app.useGlobalInterceptors(new LoggingInterceptor())
	app.useGlobalFilters(new AllExceptionFilter())
	app.use(compression())

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
