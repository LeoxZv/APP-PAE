import { CreateRolDto } from './create-rol.dto';
declare const UpdateRolDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRolDto>>;
export declare class UpdateRolDto extends UpdateRolDto_base {
    nombre_rol?: string;
}
export {};
