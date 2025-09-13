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

  private capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  async create(estudianteDto: CreateEstudianteDto) {
    const colegio = await this.colegioRepository.findOne({
      where: { id_colegio: estudianteDto.colegio },
    });
    if (!colegio) {
      throw new HttpException('Colegio not found', HttpStatus.NOT_FOUND);
    }

    const doc = await this.docRepository.findOne({
      where: { id_doc: estudianteDto.id_doc },
    });
    if (!doc) {
      throw new HttpException('Doc not found', HttpStatus.NOT_FOUND);
    }

    const grado = await this.gradoRepository.findOne({
      where: { id_grado: estudianteDto.id_grado },
    });
    if (!grado) {
      throw new HttpException('Grado not found', HttpStatus.NOT_FOUND);
    }

    const jornada = await this.jornadaRepository.findOne({
      where: { id_jornada: estudianteDto.id_jornada },
    });
    if (!jornada) {
      throw new HttpException('Jornada not found', HttpStatus.NOT_FOUND);
    }

    // Corrige las asignaciones para que coincidan las propiedades del DTO con las de la entidad
    const newEstudiante = this.estudianteRepository.create({
      nombre_estudiante: this.capitalize(estudianteDto.nombre_estudiante),
      apellido_estudiante: this.capitalize(estudianteDto.apellido_estudiante),
      numero_documento: estudianteDto.numero_documento,

      // Asigna la entidad completa que acabas de encontrar
      colegio: colegio,

      // Asigna las entidades a las propiedades de relación correctas
      tipo_doc: doc,
      grado: grado,
      jornada: jornada,
    });

    return this.estudianteRepository.save(newEstudiante);
  }

  async findAll(): Promise<Estudiante[]> {
    return this.estudianteRepository.find({
      // Corrige los nombres de las relaciones para que coincidan con la entidad
      relations: ['colegio', 'tipo_doc', 'grado', 'jornada'],
      order: { id_estudiante: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id_estudiante: id },
      // Eagerly load the related entities
      relations: ['tipo_doc', 'grado', 'jornada', 'colegio'],
    });
    if (!estudiante) {
      throw new HttpException('Estudiante not found', HttpStatus.NOT_FOUND);
    }
    return estudiante;
  }

  async update(
    id: number,
    updateEstudianteDto: UpdateEstudianteDto,
  ): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id_estudiante: id },
    });
    if (!estudiante) {
      throw new HttpException('Estudiante not found', HttpStatus.NOT_FOUND);
    }

    // Actualizar propiedades simples
    if (updateEstudianteDto.nombre_estudiante) {
      estudiante.nombre_estudiante = this.capitalize(
        updateEstudianteDto.nombre_estudiante,
      );
    }
    if (updateEstudianteDto.apellido_estudiante) {
      estudiante.apellido_estudiante = this.capitalize(
        updateEstudianteDto.apellido_estudiante,
      );
    }
    if (updateEstudianteDto.numero_documento) {
      estudiante.numero_documento = updateEstudianteDto.numero_documento;
    }

    // Actualizar las relaciones
    if (updateEstudianteDto.id_doc) {
      const doc = await this.docRepository.findOne({
        where: { id_doc: updateEstudianteDto.id_doc },
      });
      if (!doc) throw new HttpException('Doc not found', HttpStatus.NOT_FOUND);
      estudiante.tipo_doc = doc;
    }

    if (updateEstudianteDto.id_grado) {
      const grado = await this.gradoRepository.findOne({
        where: { id_grado: updateEstudianteDto.id_grado },
      });
      if (!grado)
        throw new HttpException('Grado not found', HttpStatus.NOT_FOUND);
      estudiante.grado = grado;
    }

    if (updateEstudianteDto.id_jornada) {
      const jornada = await this.jornadaRepository.findOne({
        where: { id_jornada: updateEstudianteDto.id_jornada },
      });
      if (!jornada)
        throw new HttpException('Jornada not found', HttpStatus.NOT_FOUND);
      estudiante.jornada = jornada;
    }

    // Actualizar la relación de colegio si es necesario
    if (updateEstudianteDto.colegio) {
      const colegio = await this.colegioRepository.findOne({
        where: { id_colegio: updateEstudianteDto.colegio },
      });
      if (!colegio)
        throw new HttpException('Colegio not found', HttpStatus.NOT_FOUND);
      estudiante.colegio = colegio;
    }

    // Guardar el estudiante con las relaciones actualizadas
    return this.estudianteRepository.save(estudiante);
  }

  async remove(id: number) {
    const deleteResult = await this.estudianteRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new HttpException('Estudiante not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Estudiante deleted successfully' };
  }
}
