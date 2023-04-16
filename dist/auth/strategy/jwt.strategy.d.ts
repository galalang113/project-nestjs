import { AuthService } from '../services/auth.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate({ email }: {
        email: any;
    }): Promise<any>;
}
export {};
