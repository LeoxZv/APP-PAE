import { User } from 'src/modules/user/entities/user.entity';
export declare class Doc {
    id_doc: number;
    nombre: string;
    siglas: string;
    users: User[];
}
