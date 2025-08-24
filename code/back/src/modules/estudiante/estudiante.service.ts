import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Colegio } from '../colegio/entities/colegio.entity';
import { Doc } from '../doc/entities/doc.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

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
    const newEstudiante = this.estudianteRepository.create({
      nombre_estudiante: estudiante.nombre_estudiante,
      apellido_estudiante: estudiante.apellido_estudiante,
      numero_documento: estudiante.numero_documento,
      colegio,
      tipo_doc: doc,
    });
    return this.estudianteRepository.save(newEstudiante);
  }
  async findAll(): Promise<Estudiante[]> {
    return this.estudianteRepository.find({
      relations: ['colegio', 'tipo_doc'],
      order: { id_estudiante: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
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
    const estudiante = await this.estudianteRepository.findOne({
      where: { id_estudiante: id },
    });
    if (!estudiante) {
      throw new HttpException('Estudiante not found', HttpStatus.NOT_FOUND);
    }
    const updatedUser = Object.assign(estudiante, updateUserDto);
    return this.estudianteRepository.save(updatedUser);
  }

  async remove(id: number) {
    const deleteResult = await this.estudianteRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new HttpException('Estudiante not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Estudiante deleted successfully' };
  }
}

//ayuda
