import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';
import { Entrega } from './entities/entrega.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Alimento } from '../alimento/entities/alimento.entity';
export declare class EntregaService {
    private readonly entregaRepository;
    private readonly userRepository;
    private readonly estudianteRepository;
    private readonly alimentoRepository;
    constructor(entregaRepository: Repository<Entrega>, userRepository: Repository<User>, estudianteRepository: Repository<Estudiante>, alimentoRepository: Repository<Alimento>);
    create(createEntregaDto: CreateEntregaDto): Promise<Entrega>;
    findAll(): Promise<Entrega[]>;
    findOne(id: number): Promise<Entrega>;
    update(id: number, updateEntregaDto: UpdateEntregaDto): Promise<Entrega>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
