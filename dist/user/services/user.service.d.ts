/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create(userDto: CreateUserDto): Promise<any>;
    findByLogin({ email, password }: LoginUserDto): Promise<any>;
    findByEmail(email: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(query: any): Promise<any>;
    update(filter: any, update: any): Promise<import("mongoose").Document<unknown, {}, import("../schemas/user.schema").User> & Omit<import("../schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    private reverse;
    getUserByRefresh(refresh_token: any, email: any): Promise<any>;
}
