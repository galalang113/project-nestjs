import { LoginUserDto } from 'src/user/dto/user.dto';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto): Promise<{
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
    refresh(body: any): Promise<{
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
    register(createUserDto: any): Promise<{
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
