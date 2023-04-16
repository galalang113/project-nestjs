export const Colorize = {
	green: (text: string | number): string => `\x1b[32m${text}\x1b[0m`,
	yellow: (text: string | number): string => `\x1b[33m${text}\x1b[0m`,
	red: (text: string | number): string => `\x1b[31m${text}\x1b[0m`,
	dim: (text: string | number): string => `\x1b[2m${text}\x1b[0m`,
}
