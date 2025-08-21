import { CreateColegioDto } from './create-colegio.dto';
declare const UpdateColegioDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateColegioDto>>;
export declare class UpdateColegioDto extends UpdateColegioDto_base {
    nombre_colegio?: string;
    direccion_colegio?: string;
}
export {};
