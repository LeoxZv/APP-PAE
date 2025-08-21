import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 55)
  nombre_user: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 55)
  apellido_user: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  numero_documento: string;

  @IsString()
  @Length(1, 15)
  grado: string;

  @IsString()
  @Length(1, 15)
  jornada: string;

  @IsNotEmpty()
  @IsNumber()
  tipo_doc: number;

  @IsNotEmpty()
  @IsNumber()
  colegio: number;
  nombre: string | undefined;
}
