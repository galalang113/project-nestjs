"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const compression = require("compression");
const app_module_1 = require("./app.module");
const logger_1 = require("./utils/logger");
const log_console_config_1 = require("./utils/logger/log-console.config");
const all_exception_filter_1 = require("./utils/filters/all-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: false,
    });
    app.enableShutdownHooks();
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new logger_1.LoggingInterceptor());
    app.useGlobalFilters(new all_exception_filter_1.AllExceptionFilter());
    app.use(compression());
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Project Nestjs')
        .addBearerAuth()
        .setDescription(`
      The Project Nestjs APIs documentation
      - 🪲: bug
      - ⌛: doing
      - 🧑‍🔬: to test
      - 🌟: done, haven't tested yet
      - ✅: done, tested
      - 🚫: deprecated
      - 📄: support load more
    `)
        .setVersion('v1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    const logger = new log_console_config_1.Logger(app_module_1.AppModule.name);
    logger.info('bootstrap', `Server is listening on port ${3000}`);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map