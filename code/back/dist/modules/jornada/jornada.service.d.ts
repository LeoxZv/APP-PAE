import { Repository } from 'typeorm';
import { Jornada } from './entities/jornada.entity';
import { CreateJornadaDto } from './dto/create-jornada.dto';
import { UpdateJornadaDto } from './dto/update-jornada.dto';
export declare class JornadaService {
    private readonly jornadaRepository;
    constructor(jornadaRepository: Repository<Jornada>);
    create(createJornadaDto: CreateJornadaDto): Promise<Jornada>;
    findAll(): Promise<Jornada[]>;
    findOne(id: number): Promise<Jornada | null>;
    update(id: number, updateJornadaDto: UpdateJornadaDto): Promise<Jornada & UpdateJornadaDto>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
