import { PartialType } from '@nestjs/mapped-types';
import { CreateJornadaDto } from './create-jornada.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateJornadaDto extends PartialType(CreateJornadaDto) {
  @IsOptional()
  @IsString()
  nombre_jornada?: string;
}
