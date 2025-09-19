import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(req: RequestWithUser): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
