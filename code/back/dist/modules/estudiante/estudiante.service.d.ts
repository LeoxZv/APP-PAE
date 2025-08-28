import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Colegio } from '../colegio/entities/colegio.entity';
import { Doc } from '../doc/entities/doc.entity';
import { Grado } from '../grado/entities/grado.entity';
import { Jornada } from '../jornada/entities/jornada.entity';
export declare class EstudianteService {
    private readonly estudianteRepository;
    private readonly colegioRepository;
    private readonly docRepository;
    private readonly gradoRepository;
    private readonly jornadaRepository;
    constructor(estudianteRepository: Repository<Estudiante>, colegioRepository: Repository<Colegio>, docRepository: Repository<Doc>, gradoRepository: Repository<Grado>, jornadaRepository: Repository<Jornada>);
    create(estudiante: CreateEstudianteDto): Promise<Estudiante[]>;
    findAll(): Promise<Estudiante[]>;
    findOne(id: number): Promise<Estudiante>;
    update(id: number, updateUserDto: UpdateEstudianteDto): Promise<Estudiante>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
