import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Colegio } from '../colegio/entities/colegio.entity';
import { Doc } from '../doc/entities/doc.entity';
import { Grado } from '../grado/entities/grado.entity';
import { Jornada } from '../jornada/entities/jornada.entity';
import { EntityValidationService } from 'src/common/services/entity-validation.service';
import { User } from '../user/entities/user.entity';
export declare class EstudianteService {
    private readonly estudianteRepository;
    private readonly colegioRepository;
    private readonly docRepository;
    private readonly gradoRepository;
    private readonly jornadaRepository;
    private readonly validationService;
    constructor(estudianteRepository: Repository<Estudiante>, colegioRepository: Repository<Colegio>, docRepository: Repository<Doc>, gradoRepository: Repository<Grado>, jornadaRepository: Repository<Jornada>, validationService: EntityValidationService);
    create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante>;
    findAll(user: User): Promise<Estudiante[]>;
    findOne(id: number): Promise<Estudiante>;
    update(id: number, updateEstudianteDto: UpdateEstudianteDto, requestingUser: User): Promise<Estudiante>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
