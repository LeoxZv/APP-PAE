import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateGradoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  numero_grado: string;
}
