import { Controller, Post, Body, Res, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: CreateUserDto, @Res() res: Response) {
    const { numero_documento, password_user } = loginDto;

    const user = await this.authService.validateUser(
      numero_documento,
      password_user,
    );

    if (user) {
      return res
        .status(HttpStatus.OK)
        .json({ success: true, message: 'Login exitoso', user: user });
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, message: 'Credenciales inválidas' });
    }
  }

  @Get('')
  getHello(): string {
    return this.authService.getHello();
  }
}
