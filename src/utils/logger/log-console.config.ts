import { Colorize } from './constants'

export class Logger {
	private context: string

	constructor(context: string) {
		this.context = context
	}
	generateTimeStamp() {
		const localeStringOptions = {
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			day: '2-digit',
			month: '2-digit',
		} as any
		const timestamp = new Date(Date.now()).toLocaleString(undefined, localeStringOptions)
		return timestamp
	}
	info(funcName, message) {
		const timestamp = this.generateTimeStamp()
		process.stdout.write(`${Colorize.green('[Nestjs]')} ${timestamp} ${Colorize.yellow(`[${this.context}]`)}${Colorize.green(`:${funcName} -> ${message}`)}\n`)
	}
	warn(funcName, message) {
		const timestamp = this.generateTimeStamp()
		process.stdout.write(`${Colorize.yellow('[Nestjs]')} ${timestamp} ${Colorize.yellow(`[${this.context}]`)}${Colorize.yellow(`:${funcName} -> ${message}`)}\n`)
	}
	error(funcName, message, error?: any) {
		const timestamp = this.generateTimeStamp()

		if (error) {
			if (error instanceof Error) error = error.message
			else error = JSON.stringify(error)
		}
		process.stdout.write(
			`${Colorize.red('[Nestjs]')} ${timestamp} ${Colorize.yellow(`[${this.context}]`)}${Colorize.red(`:${funcName} -> ${message}`)} ${error ? ': ' : ''}${error}\n`,
		)
	}
}
