import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsNumber, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
  @IsNumber()
  tipo_doc?: number;

  @IsOptional()
  @IsString()
  @Length(1, 64)
  password_user?: string;

  @IsOptional()
  @IsNumber()
  rol?: number;

  @IsOptional()
  @IsNumber()
  colegio?: number;
}
