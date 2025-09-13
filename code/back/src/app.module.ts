// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { DocModule } from './modules/doc/doc.module';
import { ColegioModule } from './modules/colegio/colegio.module';
import { AlimentoModule } from './modules/alimento/alimento.module';
import { UserModule } from './modules/user/user.module';
import { EntregaModule } from './modules/entrega/entrega.module';
import { RolModule } from './modules/rol/rol.module';
import { EstudianteModule } from './modules/estudiante/estudiante.module';
import { AuthModule } from './modules/auth/auth.module';
import { GradoModule } from './modules/grado/grado.module';
import { JornadaModule } from './modules/jornada/jornada.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './modules/auth/roles/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        charset: 'utf8mb4',
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
      global: true,
    }),
    DocModule,
    ColegioModule,
    AlimentoModule,
    UserModule,
    EntregaModule,
    RolModule,
    EstudianteModule,
    AuthModule,
    GradoModule,
    JornadaModule,
  ],
  providers: [
    // Register global guards in the correct order
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
