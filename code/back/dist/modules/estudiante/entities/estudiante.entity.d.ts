import { Colegio } from 'src/modules/colegio/entities/colegio.entity';
import { Doc } from 'src/modules/doc/entities/doc.entity';
import { Grado } from '../../grado/entities/grado.entity';
import { Jornada } from 'src/modules/jornada/entities/jornada.entity';
export declare class Estudiante {
    id_estudiante: number;
    nombre_estudiante: string;
    apellido_estudiante: string;
    numero_documento: string;
    grado: Grado;
    jornada: Jornada;
    tipo_doc: Doc;
    colegio: Colegio | null;
}
