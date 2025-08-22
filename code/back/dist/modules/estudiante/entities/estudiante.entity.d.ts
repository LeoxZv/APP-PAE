import { Colegio } from 'src/modules/colegio/entities/colegio.entity';
import { Doc } from 'src/modules/doc/entities/doc.entity';
export declare class Estudiante {
    id_estudiante: number;
    nombre_user: string;
    apellido_user: string;
    numero_documento: string;
    grado: string;
    jornada: string;
    tipo_doc: Doc;
    colegio: Colegio;
}
