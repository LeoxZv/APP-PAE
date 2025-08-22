import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    nombre?: string;
    apellido?: string;
    numero_documento?: string;
    tipo_doc?: number;
    password_user?: string;
    rol?: number;
    colegio?: number;
}
export {};
