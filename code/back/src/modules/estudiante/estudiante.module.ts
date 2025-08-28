import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Colegio } from '../colegio/entities/colegio.entity';
import { Doc } from '../doc/entities/doc.entity';
import { Grado } from '../grado/entities/grado.entity';
import { Jornada } from '../jornada/entities/jornada.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estudiante, Colegio, Doc, Grado, Jornada]),
  ],
  controllers: [EstudianteController],
  providers: [EstudianteService],
  exports: [TypeOrmModule],
})
export class EstudianteModule {}
