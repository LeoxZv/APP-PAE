import { GradoService } from './grado.service';
import { CreateGradoDto } from './dto/create-grado.dto';
import { UpdateGradoDto } from './dto/update-grado.dto';
export declare class GradoController {
    private readonly gradoService;
    constructor(gradoService: GradoService);
    create(createGradoDto: CreateGradoDto): Promise<import("./entities/grado.entity").Grado>;
    findAll(): Promise<import("./entities/grado.entity").Grado[]>;
    findOne(id: string): Promise<import("./entities/grado.entity").Grado | null>;
    update(id: string, updateGradoDto: UpdateGradoDto): Promise<import("./entities/grado.entity").Grado & UpdateGradoDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
