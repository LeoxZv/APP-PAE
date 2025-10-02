/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Rol } from '../rol/entities/rol.entity';
import { Colegio } from '../colegio/entities/colegio.entity';
import { Doc } from '../doc/entities/doc.entity';
import * as bcrypt from 'bcrypt';
import { EntityValidationService } from 'src/common/services/entity-validation.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

    @InjectRepository(Colegio)
    private readonly colegioRepository: Repository<Colegio>,

    @InjectRepository(Doc)
    private readonly docRepository: Repository<Doc>,

    private readonly validationService: EntityValidationService,
  ) {}

  async create(user: CreateUserDto) {
    // Pasa el ID del rol (user.rol) y el nombre de la clave primaria ('id_rol')
    const rolEntity = await this.validationService.findEntityById(
      this.rolRepository,
      user.rol,
      'id_rol',
    );

    // Pasa el ID del tipo de documento (user.tipo_doc) y el nombre de la clave primaria ('id_doc')
    const docEntity = await this.validationService.findEntityById(
      this.docRepository,
      user.tipo_doc,
      'id_doc',
    );

    let colegioEntity: Colegio | null = null;
    if (user.colegio) {
      // Pasa el ID del colegio (user.colegio) y el nombre de la clave primaria ('id_colegio')
      colegioEntity = await this.validationService.findEntityById(
        this.colegioRepository,
        user.colegio,
        'id_colegio',
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password_user, salt);

    const newUser = this.userRepository.create({
      nombre_user: this.validationService.capitalize(user.nombre_user),
      apellido_user: this.validationService.capitalize(user.apellido_user),
      password_user: hashedPassword,
      numero_documento: user.numero_documento,
      rol: rolEntity,
      colegio: colegioEntity,
      tipo_doc: docEntity,
    });

    return this.userRepository.save(newUser);
  }

  async findAll(user: any): Promise<User[]> {
    const userRole = user.rol.nombre_rol;
    const findOptions: any = {
      relations: ['rol', 'colegio', 'tipo_doc'],
    };

    switch (userRole) {
      case 'Aseador':
        break;

      case 'Admin':
        findOptions.where = {
          rol: {
            nombre_rol: In(['Colegio', 'Profesor']),
          },
        };
        break;

      case 'Colegio':
        if (!user.colegio || !user.colegio.id_colegio) {
          return [];
        }
        findOptions.where = {
          colegio: {
            id_colegio: user.colegio.id_colegio,
          },
        };
        break;

      default:
        throw new UnauthorizedException(
          'No tienes permisos para ver esta información.',
        );
    }
    return await this.userRepository.find(findOptions);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id_user: id },
      relations: ['rol', 'colegio', 'tipo_doc'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id_user: id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updatedData: Partial<User> = {};

    if (updateUserDto.nombre_user) {
      updatedData.nombre_user = this.validationService.capitalize(
        updateUserDto.nombre_user,
      );
    }
    if (updateUserDto.apellido_user) {
      updatedData.apellido_user = this.validationService.capitalize(
        updateUserDto.apellido_user,
      );
    }
    if (updateUserDto.numero_documento) {
      updatedData.numero_documento = updateUserDto.numero_documento;
    }

    if (updateUserDto.password_user) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password_user = await bcrypt.hash(
        updateUserDto.password_user,
        salt,
      );
    }

    // validacion de relaciones
    if (updateUserDto.rol) {
      const rolEntity = await this.validationService.findEntityById(
        this.rolRepository,
        updateUserDto.rol,
        'id_rol', // <-- Corregido
      );
      updatedData.rol = rolEntity;
    }

    if (updateUserDto.colegio) {
      const colegioEntity = await this.validationService.findEntityById(
        this.colegioRepository,
        updateUserDto.colegio,
        'id_colegio', // <-- Corregido
      );
      updatedData.colegio = colegioEntity;
    }

    if (updateUserDto.tipo_doc) {
      const docEntity = await this.validationService.findEntityById(
        this.docRepository,
        updateUserDto.tipo_doc,
        'id_doc', // <-- Corregido
      );
      updatedData.tipo_doc = docEntity;
    }

    const updatedUser = Object.assign(user, updatedData);
    return this.userRepository.save(updatedUser);
  }

  async remove(id: number) {
    const deleteResult = await this.userRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'User deleted successfully' };
  }
}
