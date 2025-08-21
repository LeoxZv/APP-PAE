import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregaService } from './entrega.service';
import { EntregaController } from './entrega.controller';
import { Entrega } from './entities/entrega.entity';
import { User } from '../user/entities/user.entity';
import { Alimento } from '../alimento/entities/alimento.entity';
import { Estudiante } from '../estudiante/entities/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entrega, User, Alimento, Estudiante])],
  controllers: [EntregaController],
  providers: [EntregaService],
})
export class EntregaModule {}
