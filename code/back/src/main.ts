import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Habilita CORS con credenciales

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:5500', // O una lista de orígenes permitidos
  });

  app.use(cookieParser()); // Los guards se registrarán globalmente en app.module.ts
  // Aplica el ValidationPipe globalmente

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
