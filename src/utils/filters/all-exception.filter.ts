import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface'
import { Logger } from '../logger/log-console.config'

export interface IError<T> {
	message: string
	statusCode: number
	data?: T
}

export interface SendData<T> {
	statusCode: number
	errorCode: number
	message: string
	data: T
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
	private static logger: Logger
	constructor() {
		AllExceptionFilter.logger = new Logger(AllExceptionFilter.name)
	}

	catch(exception: HttpException, host: ArgumentsHost): void {
		const ctx: HttpArgumentsHost = host.switchToHttp()
		const response = ctx.getResponse() as IError<any>

		const message = exception?.message || ''
		const statusCode = exception?.getStatus() || 500
		const data = response.data

		// Response to client
		AllExceptionFilter.handleResponse(exception, host, {
			statusCode,
			errorCode: statusCode,
			message,
			data,
		} as SendData<any>)
	}

	private static handleResponse(exception: HttpException, host: ArgumentsHost, responseData: SendData<any>) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()
		const request = ctx.getRequest()

		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

		AllExceptionFilter.logger.error(
			request.method,
			`${request.originalUrl} errorCode:${responseData.errorCode}, statusCode:${responseData.statusCode}, message:${responseData.message}`,
		)
		response.status(status).json({
			statusCode: responseData.errorCode,
			message: responseData?.message,
			data: responseData.data,
			timestamp: new Date().toISOString(),
			path: request.url,
		})
	}
}
