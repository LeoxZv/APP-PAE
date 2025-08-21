import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
export declare class RolController {
    private readonly rolService;
    constructor(rolService: RolService);
    create(createRolDto: CreateRolDto): Promise<import("./entities/rol.entity").Rol>;
    findAll(): Promise<import("./entities/rol.entity").Rol[]>;
    findOne(id: string): Promise<import("./entities/rol.entity").Rol | null>;
    update(id: string, updateRolDto: UpdateRolDto): Promise<import("./entities/rol.entity").Rol & UpdateRolDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
