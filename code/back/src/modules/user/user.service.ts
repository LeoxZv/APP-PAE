import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Rol } from '../rol/entities/rol.entity';
import { Colegio } from '../colegio/entities/colegio.entity';
import { Doc } from '../doc/entities/doc.entity';

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

  async create(user: CreateUserDto) {
    const rol = await this.rolRepository.findOne({
      where: { id_rol: user.rol },
    });
    if (!rol) {
      throw new HttpException('Rol not found', HttpStatus.NOT_FOUND);
    }
    const colegio = await this.colegioRepository.findOne({
      where: { id_colegio: user.colegio },
    });
    if (!colegio) {
      throw new HttpException('Colegio not found', HttpStatus.NOT_FOUND);
    }
    const doc = await this.docRepository.findOne({
      where: { id_doc: user.tipo_doc },
    });
    if (!doc) {
      throw new HttpException('Doc not found', HttpStatus.NOT_FOUND);
    }
    const newUser = this.userRepository.create({
      nombre_user: user.nombre_user,
      apellido_user: user.apellido_user,
      numero_documento: user.numero_documento,
      rol,
      colegio,
      tipo_doc: doc,
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
    const user = await this.userRepository.findOne({ where: { id_user: id } });
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
    const updatedUser = Object.assign(user, updateUserDto);
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
