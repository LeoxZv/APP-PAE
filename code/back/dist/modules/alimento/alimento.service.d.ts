import { Repository } from 'typeorm';
import { Alimento } from './entities/alimento.entity';
import { CreateAlimentoDto } from './dto/create-alimento.dto';
import { UpdateAlimentoDto } from './dto/update-alimento.dto';
export declare class AlimentoService {
    private readonly alimentoRepository;
    constructor(alimentoRepository: Repository<Alimento>);
    create(createAlimentoDto: CreateAlimentoDto): Promise<Alimento>;
    findAll(): Promise<Alimento[]>;
    findOne(id: number): Promise<Alimento | null>;
    update(id: number, updateAlimentoDto: UpdateAlimentoDto): Promise<Alimento & UpdateAlimentoDto>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
