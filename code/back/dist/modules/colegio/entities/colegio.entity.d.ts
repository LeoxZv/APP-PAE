import { User } from 'src/modules/user/entities/user.entity';
export declare class Colegio {
    id_colegio: number;
    nombre_colegio: string;
    direccion_colegio: string;
    users: User[];
}
