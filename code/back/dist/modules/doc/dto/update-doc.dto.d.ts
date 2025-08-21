import { CreateDocDto } from './create-doc.dto';
declare const UpdateDocDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDocDto>>;
export declare class UpdateDocDto extends UpdateDocDto_base {
    nombre?: string;
    siglas?: string;
}
export {};
