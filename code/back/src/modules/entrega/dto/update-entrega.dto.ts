import { PartialType } from '@nestjs/mapped-types';
import { CreateEntregaDto } from './create-entrega.dto';
import { IsOptional, IsDate, IsNumber } from 'class-validator';

export class UpdateEntregaDto extends PartialType(CreateEntregaDto) {
  @IsOptional()
  @IsDate()
  hora_entrega?: Date;

  @IsOptional()
  @IsNumber()
  emisor?: number;

  @IsOptional()
  @IsNumber()
  receptor?: number;

  @IsOptional()
  @IsNumber()
  alimento?: number;

  @IsOptional()
  @IsNumber()
  cantidad?: number;
}
