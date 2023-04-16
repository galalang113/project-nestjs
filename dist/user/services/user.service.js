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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(userDto) {
        userDto.password = await bcrypt.hash(userDto.password, 10);
        const userInDb = await this.userRepository.findByCondition({
            email: userDto.email,
        });
        if (userInDb) {
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.userRepository.create(userDto);
    }
    async findByLogin({ email, password }) {
        const user = await this.userRepository.findByCondition({
            email: email,
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.UNAUTHORIZED);
        }
        const is_equal = bcrypt.compareSync(password, user.password);
        if (!is_equal) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    async findByEmail(email) {
        return await this.userRepository.findByCondition({
            email: email,
        });
    }
    async findAll() {
        return this.userRepository.findAll();
    }
    async findOne(query) {
        return this.userRepository.findByCondition(query);
    }
    async update(filter, update) {
        if (update.refreshToken) {
            update.refreshToken = await bcrypt.hash(this.reverse(update.refreshToken), 10);
        }
        return await this.userRepository.findByConditionAndUpdate(filter, update);
    }
    reverse(s) {
        return s.split('').reverse().join('');
    }
    async getUserByRefresh(refresh_token, email) {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
        const is_equal = await bcrypt.compare(this.reverse(refresh_token), user.refreshToken);
        if (!is_equal) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map