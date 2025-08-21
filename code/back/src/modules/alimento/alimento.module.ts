import { Module } from '@nestjs/common';
import { AlimentoService } from './alimento.service';
import { AlimentoController } from './alimento.controller';
import { Alimento } from './entities/alimento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Alimento])],
  controllers: [AlimentoController],
  providers: [AlimentoService],
  exports: [TypeOrmModule],
})
export class AlimentoModule {}
