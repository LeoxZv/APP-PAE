import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDto } from './create-estudiante.dto';
import { IsOptional, IsString, IsNumber, Length } from 'class-validator';

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {
  @IsOptional()
  @IsString()
  @Length(1, 55)
  nombre?: string;

  @IsOptional()
  @IsString()
  @Length(1, 55)
  apellido?: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  numero_documento?: string;

  @IsOptional()
  @IsString()
  @Length(1, 15)
  grado?: string;

  @IsOptional()
  @IsString()
  @Length(1, 15)
  jornada?: string;

  @IsOptional()
  @IsNumber()
  tipo_doc?: number;

  @IsOptional()
  @IsNumber()
  colegio?: number;
}
