import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateColegioDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 55)
  nombre_colegio: string;
  @IsString()
  @IsNotEmpty()
  @Length(1, 55)
  direccion_colegio: string;
}
