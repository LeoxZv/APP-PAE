import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
export declare class AuthService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    validateUser(documento: string, password_user: string): Promise<any>;
    getHello(): string;
}
