import { ColegioService } from './colegio.service';
import { CreateColegioDto } from './dto/create-colegio.dto';
import { UpdateColegioDto } from './dto/update-colegio.dto';
export declare class ColegioController {
    private readonly colegioService;
    constructor(colegioService: ColegioService);
    create(createColegioDto: CreateColegioDto): Promise<import("./entities/colegio.entity").Colegio>;
    findAll(): Promise<import("./entities/colegio.entity").Colegio[]>;
    findOne(id: string): Promise<import("./entities/colegio.entity").Colegio | null>;
    update(id: string, updateColegioDto: UpdateColegioDto): Promise<import("./entities/colegio.entity").Colegio & UpdateColegioDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
