// src/modules/entrega/entrega.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entrega } from './entities/entrega.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Alimento } from '../alimento/entities/alimento.entity';
import { EntityValidationService } from 'src/common/services/entity-validation.service';

@Injectable()
export class EntregaService {
  constructor(
    @InjectRepository(Entrega)
    private readonly entregaRepository: Repository<Entrega>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Alimento)
    private readonly alimentoRepository: Repository<Alimento>,

    private readonly validationService: EntityValidationService,
  ) {}

  // Método para crear una entrega desde un escaneo de QR
  async createLog(
    id_estudiante: number,
    id_emisor: number,
    id_alimento: number,
  ) {
    const emisor = await this.validationService.findEntityById(
      this.userRepository,
      id_emisor,
      'Emisor',
    );

    const receptor = await this.validationService.findEntityById(
      this.estudianteRepository,
      id_estudiante,
      'Estudiante',
    );

    const alimento = await this.validationService.findEntityById(
      this.alimentoRepository,
      id_alimento,
      'Alimento',
    );

    const entrega = this.entregaRepository.create({
      hora_entrega: new Date(),
      emisor,
      receptor,
      alimento,
    });

    return this.entregaRepository.save(entrega);
  }

  // Métodos CRUD existentes...
  async create(createEntregaDto: CreateEntregaDto) {
    const emisor = await this.validationService.findEntityById(
      this.userRepository,
      createEntregaDto.emisor,
      'Emisor',
    );

    const receptor = await this.validationService.findEntityById(
      this.estudianteRepository,
      createEntregaDto.receptor,
      'Receptor',
    );

    const alimento = await this.validationService.findEntityById(
      this.alimentoRepository,
      createEntregaDto.alimento,
      'Alimento',
    );

    const entrega = this.entregaRepository.create({
      hora_entrega: createEntregaDto.hora_entrega,
      emisor: emisor,
      receptor: receptor,
      alimento: alimento,
    });
    return this.entregaRepository.save(entrega);
  }

  async findAll(): Promise<Entrega[]> {
    return this.entregaRepository.find({
      relations: ['emisor', 'receptor', 'alimento'],
    });
  }

  async findOne(id: number): Promise<Entrega> {
    const entrega = await this.entregaRepository.findOne({
      where: { id_entrega: id },
      relations: ['emisor', 'receptor', 'alimento'],
    });
    if (!entrega) {
      throw new HttpException('Entrega not found', HttpStatus.NOT_FOUND);
    }
    return entrega;
  }

  async update(
    id: number,
    updateEntregaDto: UpdateEntregaDto,
  ): Promise<Entrega> {
    const entrega_existente = await this.entregaRepository.findOneBy({
      id_entrega: id,
    });
    if (!entrega_existente) {
      throw new HttpException('Entrega not found', HttpStatus.NOT_FOUND);
    }
    const updatedEntrega = Object.assign(entrega_existente, updateEntregaDto);
    return this.entregaRepository.save(updatedEntrega);
  }

  async remove(id: number) {
    const result = await this.entregaRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Entrega not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Entrega deleted successfully' };
  }
}
