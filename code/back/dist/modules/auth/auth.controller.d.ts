import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getHello(): string;
}
