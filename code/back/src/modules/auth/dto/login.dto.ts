import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  numero_documento: string;

  @IsNotEmpty()
  @IsString()
  password_user: string;
}
