"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const log_console_config_1 = require("./log-console.config");
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor() {
        this.logger = new log_console_config_1.Logger(LoggingInterceptor_1.name);
    }
    intercept(context, next) {
        const now = Date.now();
        const timeOut = 60 * 1000;
        const response = context.switchToHttp().getResponse();
        response.setTimeout(timeOut);
        return next.handle().pipe((0, operators_1.tap)(() => {
            const { method, originalUrl } = context.switchToHttp().getRequest();
            const timeMs = Date.now() - now;
            if (timeMs > timeOut) {
                this.logger.warn(method, `${originalUrl} ${timeMs}ms`);
            }
            else {
                this.logger.info(method, `${originalUrl} ${timeMs}ms`);
            }
        }));
    }
};
LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=logging.interceptor.js.map