import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jornada } from './entities/jornada.entity';
import { CreateJornadaDto } from './dto/create-jornada.dto';
import { UpdateJornadaDto } from './dto/update-jornada.dto';

@Injectable()
export class JornadaService {
  constructor(
    @InjectRepository(Jornada)
    private readonly jornadaRepository: Repository<Jornada>,
  ) {}

  create(createJornadaDto: CreateJornadaDto) {
    const jornada = this.jornadaRepository.create(createJornadaDto);
    return this.jornadaRepository.save(jornada);
  }

  findAll() {
    return (this.jornadaRepository.find(), 'encontraste todos');
  }

  findOne(id: number) {
    return this.jornadaRepository.findOne({ where: { id_jornada: id } });
  }

  async update(id: number, updateJornadaDto: UpdateJornadaDto) {
    const jornada = await this.jornadaRepository.findOne({
      where: { id_jornada: id },
    });
    if (!jornada) {
      throw new HttpException('Jornada not found', HttpStatus.NOT_FOUND);
    }
    const updatedJornada = Object.assign(jornada, updateJornadaDto);
    return this.jornadaRepository.save(updatedJornada);
  }

  async remove(id: number) {
    const result = await this.jornadaRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Jornada not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Jornada deleted successfully' };
  }
}
