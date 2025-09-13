import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Rol } from '../rol/entities/rol.entity';
import { Colegio } from '../colegio/entities/colegio.entity';
import { Doc } from '../doc/entities/doc.entity';
import * as bcrypt from 'bcrypt';

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
  ) {}

  private capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  async create(user: CreateUserDto) {
    const rolEntity = await this.rolRepository.findOne({
      where: { id_rol: user.rol },
    });
    if (!rolEntity) {
      throw new HttpException('Rol not found', HttpStatus.NOT_FOUND);
    }

    const colegioEntity = await this.colegioRepository.findOne({
      where: { id_colegio: user.colegio },
    });
    if (!colegioEntity) {
      throw new HttpException('Colegio not found', HttpStatus.NOT_FOUND);
    }

    const docEntity = await this.docRepository.findOne({
      where: { id_doc: user.tipo_doc },
    });
    if (!docEntity) {
      throw new HttpException('Doc not found', HttpStatus.NOT_FOUND);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password_user, salt);

    const newUser = this.userRepository.create({
      nombre_user: this.capitalize(user.nombre_user),
      apellido_user: this.capitalize(user.apellido_user),
      password_user: hashedPassword,
      numero_documento: user.numero_documento,
      rol: rolEntity,
      colegio: colegioEntity,
      tipo_doc: docEntity,
    });

    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['rol', 'colegio', 'tipo_doc'],
      order: { id_user: 'ASC' },
    });
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

    // Crea un objeto para almacenar los datos a actualizar
    const updatedData: Partial<User> = {};

    // 1. Actualizar campos simples si existen en el DTO
    if (updateUserDto.nombre_user) {
      updatedData.nombre_user = this.capitalize(updateUserDto.nombre_user);
    }
    if (updateUserDto.apellido_user) {
      updatedData.apellido_user = this.capitalize(updateUserDto.apellido_user);
    }
    if (updateUserDto.numero_documento) {
      updatedData.numero_documento = updateUserDto.numero_documento;
    }

    // 2. Manejar la actualización de la contraseña
    if (updateUserDto.password_user) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password_user = await bcrypt.hash(
        updateUserDto.password_user,
        salt,
      );
    }

    // 3. Manejar las relaciones (Foreign Keys)
    if (updateUserDto.rol) {
      const rolEntity = await this.rolRepository.findOne({
        where: { id_rol: updateUserDto.rol },
      });
      if (!rolEntity) {
        throw new HttpException('Rol not found', HttpStatus.NOT_FOUND);
      }
      updatedData.rol = rolEntity;
    }

    if (updateUserDto.colegio) {
      const colegioEntity = await this.colegioRepository.findOne({
        where: { id_colegio: updateUserDto.colegio },
      });
      if (!colegioEntity) {
        throw new HttpException('Colegio not found', HttpStatus.NOT_FOUND);
      }
      updatedData.colegio = colegioEntity;
    }

    if (updateUserDto.tipo_doc) {
      const docEntity = await this.docRepository.findOne({
        where: { id_doc: updateUserDto.tipo_doc },
      });
      if (!docEntity) {
        throw new HttpException('Doc not found', HttpStatus.NOT_FOUND);
      }
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
