import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDocDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 55)
  nombre: string;
  @IsString()
  @IsNotEmpty()
  @Length(1, 55)
  siglas: string;
}
