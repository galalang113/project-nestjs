"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const constants_1 = require("./constants");
class Logger {
    constructor(context) {
        this.context = context;
    }
    generateTimeStamp() {
        const localeStringOptions = {
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            day: '2-digit',
            month: '2-digit',
        };
        const timestamp = new Date(Date.now()).toLocaleString(undefined, localeStringOptions);
        return timestamp;
    }
    info(funcName, message) {
        const timestamp = this.generateTimeStamp();
        process.stdout.write(`${constants_1.Colorize.green('[Nestjs]')} ${timestamp} ${constants_1.Colorize.yellow(`[${this.context}]`)}${constants_1.Colorize.green(`:${funcName} -> ${message}`)}\n`);
    }
    warn(funcName, message) {
        const timestamp = this.generateTimeStamp();
        process.stdout.write(`${constants_1.Colorize.yellow('[Nestjs]')} ${timestamp} ${constants_1.Colorize.yellow(`[${this.context}]`)}${constants_1.Colorize.yellow(`:${funcName} -> ${message}`)}\n`);
    }
    error(funcName, message) {
        const timestamp = this.generateTimeStamp();
        process.stdout.write(`${constants_1.Colorize.red('[Nestjs]')} ${timestamp} ${constants_1.Colorize.yellow(`[${this.context}]`)}${constants_1.Colorize.red(`:${funcName} -> ${message}`)}\n`);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=log-console.config.js.map