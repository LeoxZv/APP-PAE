import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Rol } from '../rol/entities/rol.entity';
import { Colegio } from '../colegio/entities/colegio.entity';
import { Doc } from '../doc/entities/doc.entity';
import { EntityValidationService } from 'src/common/services/entity-validation.service';
export declare class UserService {
    private readonly userRepository;
    private readonly rolRepository;
    private readonly colegioRepository;
    private readonly docRepository;
    private readonly validationService;
    constructor(userRepository: Repository<User>, rolRepository: Repository<Rol>, colegioRepository: Repository<Colegio>, docRepository: Repository<Doc>, validationService: EntityValidationService);
    create(user: CreateUserDto): Promise<User>;
    findAll(user: any): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
