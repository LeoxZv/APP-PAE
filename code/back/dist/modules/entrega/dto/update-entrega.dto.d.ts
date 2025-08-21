import { CreateEntregaDto } from './create-entrega.dto';
declare const UpdateEntregaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateEntregaDto>>;
export declare class UpdateEntregaDto extends UpdateEntregaDto_base {
    hora_entrega?: Date;
    emisor?: number;
    receptor?: number;
    alimento?: number;
    cantidad?: number;
}
export {};
