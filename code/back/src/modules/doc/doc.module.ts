import { Module } from '@nestjs/common';
import { DocService } from './doc.service';
import { DocController } from './doc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doc } from './entities/doc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doc])],
  controllers: [DocController],
  providers: [DocService],
  exports: [TypeOrmModule],
})
export class DocModule {}
