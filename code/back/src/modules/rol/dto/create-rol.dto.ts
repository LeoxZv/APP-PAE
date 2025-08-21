import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRolDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 55)
  nombre_rol: string;
}
