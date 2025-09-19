import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 55)
  nombre_user: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 55)
  apellido_user: string;

  @IsNotEmpty()
  @IsString()
  password_user: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  numero_documento: string;

  @IsNotEmpty()
  @IsNumber()
  tipo_doc: number;

  @IsNotEmpty()
  @IsNumber()
  rol: number;

  @IsOptional()
  @IsNumber()
  colegio: number | null;
}
