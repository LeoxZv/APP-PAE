import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Colegio } from '../colegio/entities/colegio.entity';
import { Doc } from '../doc/entities/doc.entity';
import { Grado } from '../grado/entities/grado.entity';
import { Jornada } from '../jornada/entities/jornada.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Colegio)
    private readonly colegioRepository: Repository<Colegio>,

    @InjectRepository(Doc)
    private readonly docRepository: Repository<Doc>,

    @InjectRepository(Grado)
    private readonly gradoRepository: Repository<Grado>,

    @InjectRepository(Jornada)
    private readonly jornadaRepository: Repository<Jornada>,
  ) {}

  async create(estudiante: CreateEstudianteDto) {
    const colegio = await this.colegioRepository.findOne({
      where: { id_colegio: estudiante.colegio },
    });
    if (!colegio) {
      throw new HttpException('Colegio not found', HttpStatus.NOT_FOUND);
    }

    const doc = await this.docRepository.findOne({
      where: { id_doc: estudiante.id_doc },
    });
    if (!doc) {
      throw new HttpException('Doc not found', HttpStatus.NOT_FOUND);
    }

    const grado = await this.gradoRepository.findOne({
      where: { id_grado: estudiante.id_grado },
    });
    if (!grado) {
      throw new HttpException('Grado not found', HttpStatus.NOT_FOUND);
    }

    const jornada = await this.jornadaRepository.findOne({
      where: { id_jornada: estudiante.id_jornada },
    });
    if (!jornada) {
      throw new HttpException('Jornada not found', HttpStatus.NOT_FOUND);
    }

    const newEstudiante = this.estudianteRepository.create({
      nombre_estudiante: estudiante.nombre_estudiante,
      apellido_estudiante: estudiante.apellido_estudiante,
      numero_documento: estudiante.numero_documento,
      colegio: colegio,
      id_doc: doc,
      id_grado: grado,
      id_jornada: jornada,
    });
    return this.estudianteRepository.save(newEstudiante);
  }

  async findAll(): Promise<Estudiante[]> {
    return this.estudianteRepository.find({
      relations: ['colegio', 'id_doc'],
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
