import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(loginUserDto: any): Promise<{
        expiresIn: string;
        accessToken: string;
        refreshToken: string;
        expiresInRefresh: string;
        email: any;
    } | {
        expiresIn: string;
        accessToken: string;
        refreshToken?: undefined;
        expiresInRefresh?: undefined;
        email: any;
    }>;
    validateUser(email: any): Promise<any>;
    private _createToken;
    register(userDto: any): Promise<{
        expiresIn: string;
        accessToken: string;
        refreshToken: string;
        expiresInRefresh: string;
        email: any;
    } | {
        expiresIn: string;
        accessToken: string;
        refreshToken?: undefined;
        expiresInRefresh?: undefined;
        email: any;
    }>;
    refresh(refresh_token: any): Promise<{
        expiresIn: string;
        accessToken: string;
        refreshToken: string;
        expiresInRefresh: string;
        email: any;
    } | {
        expiresIn: string;
        accessToken: string;
        refreshToken?: undefined;
        expiresInRefresh?: undefined;
        email: any;
    }>;
}
