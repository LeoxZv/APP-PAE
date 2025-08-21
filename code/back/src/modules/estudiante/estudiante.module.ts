import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Rol } from '../rol/entities/rol.entity';
import { Colegio } from '../colegio/entities/colegio.entity';
import { Doc } from '../doc/entities/doc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Rol, Colegio, Doc])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
  exports: [TypeOrmModule],
})
export class EstudianteModule {}
