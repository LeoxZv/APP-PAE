import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Rol } from '../rol/entities/rol.entity';
import { Colegio } from '../colegio/entities/colegio.entity';
import { Doc } from '../doc/entities/doc.entity';
export declare class EstudianteService {
    private readonly userRepository;
    private readonly rolRepository;
    private readonly colegioRepository;
    private readonly docRepository;
    constructor(userRepository: Repository<Estudiante>, rolRepository: Repository<Rol>, colegioRepository: Repository<Colegio>, docRepository: Repository<Doc>);
    create(estudiante: CreateEstudianteDto): Promise<Estudiante>;
    findAll(): Promise<Estudiante[]>;
    findOne(id: number): Promise<Estudiante>;
    update(id: number, updateUserDto: UpdateEstudianteDto): Promise<Estudiante>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
