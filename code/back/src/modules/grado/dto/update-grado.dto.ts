import { PartialType } from '@nestjs/mapped-types';
import { CreateGradoDto } from './create-grado.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateGradoDto extends PartialType(CreateGradoDto) {
  @IsOptional()
  @IsString()
  numero_grado?: string;
}
