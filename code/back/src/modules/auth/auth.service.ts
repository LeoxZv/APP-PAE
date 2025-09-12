// src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(documento: string, password_user: string): Promise<any> {
    const foundUser = await this.usersRepository.findOne({
      where: { numero_documento: documento },
      relations: ['rol', 'colegio', 'tipo_doc'], // Asegúrate de cargar todas las relaciones necesarias
    });

    if (!foundUser) {
      throw new UnauthorizedException(
        'El documento ingresado no corresponde a ningún usuario.',
      );
    }

    const isMatch = await bcrypt.compare(
      password_user,
      foundUser.password_user,
    );

    if (!isMatch) {
      throw new UnauthorizedException('La contraseña es incorrecta.');
    }

    // No destructuramos la contraseña aquí, para que el objeto completo pueda ser usado
    return foundUser;
  }

  login(user: any) {
    // Almacenamos el objeto completo del usuario en el payload del token.
    // JwtService.sign() se encarga de serializarlo.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload = {
      ...user,
      password_user: undefined,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
