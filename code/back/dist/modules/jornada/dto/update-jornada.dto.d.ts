import { CreateJornadaDto } from './create-jornada.dto';
declare const UpdateJornadaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateJornadaDto>>;
export declare class UpdateJornadaDto extends UpdateJornadaDto_base {
    nombre_jornada?: string;
}
export {};
