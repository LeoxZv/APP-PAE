import { Alimento } from 'src/modules/alimento/entities/alimento.entity';
import { Estudiante } from 'src/modules/estudiante/entities/estudiante.entity';
import { User } from 'src/modules/user/entities/user.entity';
export declare class Entrega {
    id_entrega: number;
    cantidad: number;
    hora_entrega: Date;
    emisor: User;
    receptor: Estudiante;
    alimento: Alimento;
}
