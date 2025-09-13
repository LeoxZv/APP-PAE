// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { Public } from './roles/roles.decorator'; // Import the new decorator
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { Request as Req } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public() // Mark this route as public
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { numero_documento, password_user } = loginDto;

    const user = await this.authService.validateUser(
      numero_documento,
      password_user,
    );

    const { access_token } = this.authService.login(user);

    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Login exitoso',
      user: user,
    });
  }

  @Post('logout')
  @Public() // Mark this route as public
  logout(@Res() res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Logout exitoso',
    });
  }
  @Get('me')
  @UseGuards(JwtAuthGuard) // Asegúrate de que el JWTAuthGuard está aplicado
  getProfile(@Req() req) {
    return req.user; // `req.user` contiene los datos del payload del JWT
  }
}
