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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../../user/services/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(loginUserDto) {
        const user = await this.userService.findByLogin(loginUserDto);
        const token = await this._createToken(user);
        return Object.assign({ email: user.email }, token);
    }
    async validateUser(email) {
        return await this.userService.findByEmail(email);
    }
    async _createToken({ email }, isSecondFactorAuthenticated = false, refresh = true) {
        const accessToken = this.jwtService.sign({
            email,
            isSecondFactorAuthenticated,
        });
        if (refresh) {
            const refreshToken = this.jwtService.sign({ email }, {
                secret: process.env.SECRETKEY_REFRESH,
                expiresIn: process.env.EXPIRESIN_REFRESH,
            });
            await this.userService.update({ email: email }, {
                refreshToken: refreshToken,
            });
            return {
                expiresIn: process.env.EXPIRESIN,
                accessToken,
                refreshToken,
                expiresInRefresh: process.env.EXPIRESIN_REFRESH,
            };
        }
        else {
            return {
                expiresIn: process.env.EXPIRESIN,
                accessToken,
            };
        }
    }
    async register(userDto) {
        const user = await this.userService.create(userDto);
        const token = await this._createToken(user);
        return Object.assign({ email: user.email }, token);
    }
    async refresh(refresh_token) {
        try {
            const payload = await this.jwtService.verify(refresh_token, {
                secret: process.env.SECRETKEY_REFRESH,
            });
            const user = await this.userService.getUserByRefresh(refresh_token, payload.email);
            const token = await this._createToken(user, true, false);
            return Object.assign({ email: user.email }, token);
        }
        catch (e) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map