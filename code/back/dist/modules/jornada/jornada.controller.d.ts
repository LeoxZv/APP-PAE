import { JornadaService } from './jornada.service';
import { CreateJornadaDto } from './dto/create-jornada.dto';
import { UpdateJornadaDto } from './dto/update-jornada.dto';
export declare class JornadaController {
    private readonly jornadaService;
    constructor(jornadaService: JornadaService);
    create(createJornadaDto: CreateJornadaDto): Promise<import("./entities/jornada.entity").Jornada>;
    findAll(): string;
    findOne(id: string): Promise<import("./entities/jornada.entity").Jornada | null>;
    update(id: string, updateJornadaDto: UpdateJornadaDto): Promise<import("./entities/jornada.entity").Jornada & UpdateJornadaDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
