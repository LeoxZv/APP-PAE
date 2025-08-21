import { PartialType } from '@nestjs/mapped-types';
import { CreateRolDto } from './create-rol.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateRolDto extends PartialType(CreateRolDto) {
  @IsOptional()
  @IsString()
  @Length(1, 55)
  nombre_rol?: string;
}
