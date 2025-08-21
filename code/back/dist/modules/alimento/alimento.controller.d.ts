import { AlimentoService } from './alimento.service';
import { CreateAlimentoDto } from './dto/create-alimento.dto';
import { UpdateAlimentoDto } from './dto/update-alimento.dto';
export declare class AlimentoController {
    private readonly alimentoService;
    constructor(alimentoService: AlimentoService);
    create(createAlimentoDto: CreateAlimentoDto): Promise<import("./entities/alimento.entity").Alimento>;
    findAll(): Promise<import("./entities/alimento.entity").Alimento[]>;
    findOne(id: string): Promise<import("./entities/alimento.entity").Alimento | null>;
    update(id: string, updateAlimentoDto: UpdateAlimentoDto): Promise<import("./entities/alimento.entity").Alimento & UpdateAlimentoDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
