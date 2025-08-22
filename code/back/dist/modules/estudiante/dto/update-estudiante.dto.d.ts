import { CreateEstudianteDto } from './create-estudiante.dto';
declare const UpdateEstudianteDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateEstudianteDto>>;
export declare class UpdateEstudianteDto extends UpdateEstudianteDto_base {
    nombre?: string;
    apellido?: string;
    numero_documento?: string;
    grado?: string;
    jornada?: string;
    tipo_doc?: number;
    colegio?: number;
}
export {};
