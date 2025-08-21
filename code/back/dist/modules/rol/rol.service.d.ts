import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
export declare class RolService {
    private readonly rolRepository;
    constructor(rolRepository: Repository<Rol>);
    create(createRolDto: CreateRolDto): Promise<Rol>;
    findAll(): Promise<Rol[]>;
    findOne(id: number): Promise<Rol | null>;
    update(id: number, updateRolDto: UpdateRolDto): Promise<Rol & UpdateRolDto>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
