import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioService } from './colegio.service';
import { ColegioController } from './colegio.controller';
import { Colegio } from './entities/colegio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Colegio])],
  controllers: [ColegioController],
  providers: [ColegioService],
  exports: [TypeOrmModule],
})
export class ColegioModule {}
