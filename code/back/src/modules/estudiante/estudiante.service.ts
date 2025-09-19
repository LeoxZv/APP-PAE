/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/modules/estudiante/estudiante.service.ts
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
import { EntityValidationService } from 'src/common/services/entity-validation.service';
import { User } from '../user/entities/user.entity';

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

    private readonly validationService: EntityValidationService,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    const { id_doc, id_grado, id_jornada, colegio, ...estudianteData } =
      createEstudianteDto;

    const docEntity = await this.validationService.findEntityById(
      this.docRepository,
      id_doc,
      'id_doc',
    );

    const gradoEntity = await this.validationService.findEntityById(
      this.gradoRepository,
      id_grado,
      'id_grado',
    );

    const jornadaEntity = await this.validationService.findEntityById(
      this.jornadaRepository,
      id_jornada,
      'id_jornada',
    );

    let colegioEntity: Colegio | null = null;
    if (colegio) {
      colegioEntity = await this.validationService.findEntityById(
        this.colegioRepository,
        colegio,
        'id_colegio',
      );
    }

    const nuevoEstudiante = this.estudianteRepository.create({
      ...estudianteData,
      tipo_doc: docEntity,
      grado: gradoEntity,
      jornada: jornadaEntity,
      colegio: colegioEntity,
    });

    return this.estudianteRepository.save(nuevoEstudiante);
  }

  async findAll(user: User): Promise<Estudiante[]> {
    const queryOptions: any = {
      relations: ['colegio', 'tipo_doc', 'grado', 'jornada'],
      order: { id_estudiante: 'ASC' },
      where: {}, // Agregamos un objeto where vacío
    };

    // Si el usuario no es super_admin, filtramos por su colegio
    const userRole = user.rol.nombre_rol;
    if ((userRole == 'colegio' || userRole == 'profesor') && user.colegio) {
      queryOptions.where.colegio = { id_colegio: user.colegio.id_colegio };
    }

    return this.estudianteRepository.find(queryOptions);
  }

  async findOne(id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id_estudiante: id },
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
    requestingUser: User,
  ): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id_estudiante: id },
    });
    if (!estudiante) {
      throw new HttpException('Estudiante not found', HttpStatus.NOT_FOUND);
    }

    const updatedData: Partial<Estudiante> = {};

    if (updateEstudianteDto.nombre_estudiante) {
      updatedData.nombre_estudiante = this.validationService.capitalize(
        updateEstudianteDto.nombre_estudiante,
      );
    }
    if (updateEstudianteDto.apellido_estudiante) {
      updatedData.apellido_estudiante = this.validationService.capitalize(
        updateEstudianteDto.apellido_estudiante,
      );
    }
    if (updateEstudianteDto.numero_documento) {
      updatedData.numero_documento = updateEstudianteDto.numero_documento;
    }

    // Manejar las relaciones, pasando el nombre de la propiedad del ID
    if (updateEstudianteDto.id_doc) {
      updatedData.tipo_doc = await this.validationService.findEntityById(
        this.docRepository,
        updateEstudianteDto.id_doc,
        'id_doc', // <-- Corregido
      );
    }

    if (updateEstudianteDto.id_grado) {
      updatedData.grado = await this.validationService.findEntityById(
        this.gradoRepository,
        updateEstudianteDto.id_grado,
        'id_grado', // <-- Corregido
      );
    }

    if (updateEstudianteDto.id_jornada) {
      updatedData.jornada = await this.validationService.findEntityById(
        this.jornadaRepository,
        updateEstudianteDto.id_jornada,
        'id_jornada', // <-- Corregido
      );
    }

    if (
      requestingUser.rol.nombre_rol !== 'aseador' &&
      updateEstudianteDto.colegio
    ) {
      updatedData.colegio = await this.validationService.findEntityById(
        this.colegioRepository,
        updateEstudianteDto.colegio,
        'id_colegio', // <-- Corregido
      );
    }

    const updatedEstudiante = Object.assign(estudiante, updatedData);
    return this.estudianteRepository.save(updatedEstudiante);
  }

  async remove(id: number) {
    const deleteResult = await this.estudianteRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new HttpException('Estudiante not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Estudiante deleted successfully' };
  }
}
