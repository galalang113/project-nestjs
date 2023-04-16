import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(): Promise<any>;
    create(body: any): Promise<any>;
}
