import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDto } from './create-estudiante.dto';
import { IsOptional, IsString, IsNumber, Length } from 'class-validator';

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {
  @IsOptional()
  @IsString()
  @Length(1, 55)
  nombre_estudiante?: string;

  @IsOptional()
  @IsString()
  @Length(1, 55)
  apellido_estudiante?: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  numero_documento?: string;

  @IsOptional()
  @IsNumber()
  id_grado?: number;

  @IsOptional()
  @IsNumber()
  id_jornada?: number;

  @IsOptional()
  @IsNumber()
  id_doc?: number;

  @IsOptional()
  @IsNumber()
  colegio?: number;
}
