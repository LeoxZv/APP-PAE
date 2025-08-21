import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    nombre?: string;
    apellido?: string;
    numero_documento?: string;
    grado?: string;
    jornada?: string;
    tipo_doc?: number;
    rol?: number;
    colegio?: number;
}
export {};
