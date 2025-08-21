import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Rol } from '../rol/entities/rol.entity';
import { Colegio } from '../colegio/entities/colegio.entity';
import { Doc } from '../doc/entities/doc.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly userRepository: Repository<Estudiante>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

    @InjectRepository(Colegio)
    private readonly colegioRepository: Repository<Colegio>,

    @InjectRepository(Doc)
    private readonly docRepository: Repository<Doc>,
  ) {}

  async create(estudiante: CreateEstudianteDto) {
    const colegio = await this.colegioRepository.findOne({
      where: { id_colegio: estudiante.colegio },
    });
    if (!colegio) {
      throw new HttpException('Colegio not found', HttpStatus.NOT_FOUND);
    }
    const doc = await this.docRepository.findOne({
      where: { id_doc: estudiante.tipo_doc },
    });
    if (!doc) {
      throw new HttpException('Doc not found', HttpStatus.NOT_FOUND);
    }
    const newUser = this.userRepository.create({
      nombre_user: estudiante.nombre_user,
      apellido_user: estudiante.apellido_user,
      numero_documento: estudiante.numero_documento,
      colegio,
      tipo_doc: doc,
    });
    return this.userRepository.save(newUser);
  }
  async findAll(): Promise<Estudiante[]> {
    return this.userRepository.find({
      relations: ['rol', 'colegio', 'tipo_doc'],
      order: { id_estudiante: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Estudiante> {
    const estudiante = await this.userRepository.findOne({
      where: { id_estudiante: id },
    });
    if (!estudiante) {
      throw new HttpException('Estudiante not found', HttpStatus.NOT_FOUND);
    }
    return estudiante;
  }

  async update(
    id: number,
    updateUserDto: UpdateEstudianteDto,
  ): Promise<Estudiante> {
    const estudiante = await this.userRepository.findOne({
      where: { id_estudiante: id },
    });
    if (!estudiante) {
      throw new HttpException('Estudiante not found', HttpStatus.NOT_FOUND);
    }
    const updatedUser = Object.assign(estudiante, updateUserDto);
    return this.userRepository.save(updatedUser);
  }

  async remove(id: number) {
    const deleteResult = await this.userRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new HttpException('Estudiante not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Estudiante deleted successfully' };
  }
}

//ayuda
