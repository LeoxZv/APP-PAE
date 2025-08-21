import { CreateColegioDto } from './dto/create-colegio.dto';
import { UpdateColegioDto } from './dto/update-colegio.dto';
import { Repository } from 'typeorm';
import { Colegio } from './entities/colegio.entity';
export declare class ColegioService {
    private readonly colegioRepository;
    constructor(colegioRepository: Repository<Colegio>);
    create(createColegioDto: CreateColegioDto): Promise<Colegio>;
    findAll(): Promise<Colegio[]>;
    findOne(id: number): Promise<Colegio | null>;
    update(id: number, updateColegioDto: UpdateColegioDto): Promise<Colegio & UpdateColegioDto>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
