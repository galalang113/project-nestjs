import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Logger } from './log-console.config'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private readonly logger: Logger
	constructor() {
		this.logger = new Logger(LoggingInterceptor.name)
	}
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const now = Date.now()
		const timeOut = 60 * 1000
		const response = context.switchToHttp().getResponse()
		response.setTimeout(timeOut)

		return next.handle().pipe(
			tap(() => {
				const { method, originalUrl }: any = context.switchToHttp().getRequest()
				const timeMs = Date.now() - now
				if (timeMs > timeOut) {
					this.logger.warn(method, `${originalUrl} ${timeMs}ms`)
				} else {
					this.logger.info(method, `${originalUrl} ${timeMs}ms`)
				}
			}),
		)
	}
}
