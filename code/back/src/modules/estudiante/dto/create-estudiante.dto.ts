import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  @Length(1, 55)
  nombre_estudiante: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 55)
  apellido_estudiante: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  numero_documento: string;

  @IsNotEmpty()
  @IsNumber()
  id_grado: number;

  @IsNotEmpty()
  @IsNumber()
  id_jornada: number;

  @IsNotEmpty()
  @IsNumber()
  id_doc: number;

  @IsNotEmpty()
  @IsNumber()
  colegio: number;
}
