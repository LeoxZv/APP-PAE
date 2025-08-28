import { Repository } from 'typeorm';
import { Grado } from './entities/grado.entity';
import { CreateGradoDto } from './dto/create-grado.dto';
import { UpdateGradoDto } from './dto/update-grado.dto';
export declare class GradoService {
    private readonly gradoRepository;
    constructor(gradoRepository: Repository<Grado>);
    create(createGradoDto: CreateGradoDto): Promise<Grado>;
    findAll(): Promise<Grado[]>;
    findOne(id: number): Promise<Grado | null>;
    update(id: number, updateGradoDto: UpdateGradoDto): Promise<Grado & UpdateGradoDto>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
