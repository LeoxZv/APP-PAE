// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { numero_documento, password_user } = loginDto;

    const user = await this.authService.validateUser(
      numero_documento,
      password_user,
    );

    const { access_token } = this.authService.login(user);

    // Almacena el token en una cookie HttpOnly para seguridad
    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Login exitoso',
    });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    // Para desloguear, simplemente limpiamos la cookie 'jwt'
    // Estableciéndola a una cadena vacía y con una fecha de expiración en el pasado.
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    // También puedes usar res.cookie() con una fecha de expiración pasada
    // res.cookie('jwt', '', {
    //   httpOnly: true,
    //   expires: new Date(0), // Expira inmediatamente
    // });

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Logout exitoso',
    });
  }
}
