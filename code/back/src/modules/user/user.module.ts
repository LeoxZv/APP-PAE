import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Rol } from '../rol/entities/rol.entity';
import { Colegio } from '../colegio/entities/colegio.entity';
import { Doc } from '../doc/entities/doc.entity';
import { EntityValidationService } from 'src/common/services/entity-validation.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rol, Colegio, Doc])],
  controllers: [UserController],
  providers: [UserService, EntityValidationService],
  exports: [TypeOrmModule],
})
export class UserModule {}
