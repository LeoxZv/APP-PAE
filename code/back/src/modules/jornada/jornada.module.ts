import { Module } from '@nestjs/common';
import { JornadaService } from './jornada.service';
import { JornadaController } from './jornada.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Jornada } from './entities/jornada.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jornada])],
  controllers: [JornadaController],
  providers: [JornadaService],
  exports: [TypeOrmModule],
})
export class JornadaModule {}
