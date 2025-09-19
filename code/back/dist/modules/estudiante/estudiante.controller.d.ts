import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
export declare class EstudianteController {
    private readonly EstudianteService;
    constructor(EstudianteService: EstudianteService);
    create(createEstudianteDto: CreateEstudianteDto): Promise<import("./entities/estudiante.entity").Estudiante>;
    findAll(req: any): Promise<import("./entities/estudiante.entity").Estudiante[]>;
    findOne(id: string): Promise<import("./entities/estudiante.entity").Estudiante>;
    update(id: string, updateEstudianteDto: UpdateEstudianteDto, req: any): Promise<import("./entities/estudiante.entity").Estudiante>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
