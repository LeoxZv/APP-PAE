import { CreateEstudianteDto } from './create-estudiante.dto';
declare const UpdateEstudianteDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateEstudianteDto>>;
export declare class UpdateEstudianteDto extends UpdateEstudianteDto_base {
    nombre_estudiante?: string;
    apellido_estudiante?: string;
    numero_documento?: string;
    id_grado?: number;
    id_jornada?: number;
    id_doc?: number;
    colegio?: number;
}
export {};
