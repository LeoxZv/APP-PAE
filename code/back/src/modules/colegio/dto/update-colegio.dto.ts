import { PartialType } from '@nestjs/mapped-types';
import { CreateColegioDto } from './create-colegio.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateColegioDto extends PartialType(CreateColegioDto) {
  @IsOptional()
  @IsString()
  @Length(1, 55)
  nombre_colegio?: string;

  @IsOptional()
  @IsString()
  @Length(1, 55)
  direccion_colegio?: string;
}
