import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateColegioDto } from './dto/create-colegio.dto';
import { UpdateColegioDto } from './dto/update-colegio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colegio } from './entities/colegio.entity';

@Injectable()
export class ColegioService {
  constructor(
    @InjectRepository(Colegio)
    private readonly colegioRepository: Repository<Colegio>,
  ) {}
  create(createColegioDto: CreateColegioDto) {
    const colegio = this.colegioRepository.create(createColegioDto);
    return this.colegioRepository.save(colegio);
  }

  findAll() {
    return this.colegioRepository.find();
  }

  findOne(id: number) {
    return this.colegioRepository.findOne({ where: { id_colegio: id } });
  }

  async update(id: number, updateColegioDto: UpdateColegioDto) {
    const colegio = await this.colegioRepository.findOne({
      where: { id_colegio: id },
    });
    if (!colegio) {
      throw new HttpException('Colegio not found', HttpStatus.NOT_FOUND);
    }
    const updatedColegio = Object.assign(colegio, updateColegioDto);
    return this.colegioRepository.save(updatedColegio);
  }

  async remove(id: number) {
    const result = await this.colegioRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Colegio not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Colegio deleted successfully' };
  }
}
