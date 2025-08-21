import { User } from 'src/modules/user/entities/user.entity';
export declare class Rol {
    id_rol: number;
    nombre_rol: string;
    users: User[];
}
