// src/modules/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    // Throw an error if the secret is not defined to prevent runtime issues
    if (!jwtSecret) {
      throw new Error(
        'JWT_SECRET is not defined in the environment variables.',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.jwt;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtSecret, // Use the validated variable here
    });
  }

  validate(payload: any) {
    // The payload is the decoded JWT.
    // It will contain the full user object since you configured it to do so.
    return payload;
  }
}
