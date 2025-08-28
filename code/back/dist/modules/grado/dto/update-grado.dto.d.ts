import { CreateGradoDto } from './create-grado.dto';
declare const UpdateGradoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateGradoDto>>;
export declare class UpdateGradoDto extends UpdateGradoDto_base {
    numero_grado?: string;
}
export {};
