import { PartialType } from '@nestjs/mapped-types';
import { CreateAlimentoDto } from './create-alimento.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAlimentoDto extends PartialType(CreateAlimentoDto) {
  @IsOptional()
  @IsString()
  descripcion_alimento?: string;
}
