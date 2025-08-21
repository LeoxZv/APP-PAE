import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Rol } from '../rol/entities/rol.entity';
import { Colegio } from '../colegio/entities/colegio.entity';
import { Doc } from '../doc/entities/doc.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly rolRepository;
    private readonly colegioRepository;
    private readonly docRepository;
    constructor(userRepository: Repository<User>, rolRepository: Repository<Rol>, colegioRepository: Repository<Colegio>, docRepository: Repository<Doc>);
    create(user: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
