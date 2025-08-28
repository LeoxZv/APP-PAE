import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateJornadaDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 120)
  nombre_jornada: string;
}
