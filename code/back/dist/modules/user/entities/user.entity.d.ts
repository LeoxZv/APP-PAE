import { Colegio } from 'src/modules/colegio/entities/colegio.entity';
import { Doc } from 'src/modules/doc/entities/doc.entity';
import { Rol } from 'src/modules/rol/entities/rol.entity';
export declare class User {
    id_user: number;
    nombre_user: string;
    apellido_user: string;
    password_user: string;
    numero_documento: string;
    tipo_doc: Doc;
    rol: Rol;
    colegio: Colegio | null;
}
