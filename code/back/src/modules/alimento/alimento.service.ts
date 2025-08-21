import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alimento } from './entities/alimento.entity';
import { CreateAlimentoDto } from './dto/create-alimento.dto';
import { UpdateAlimentoDto } from './dto/update-alimento.dto';

@Injectable()
export class AlimentoService {
  constructor(
    @InjectRepository(Alimento)
    private readonly alimentoRepository: Repository<Alimento>,
  ) {}

  create(createAlimentoDto: CreateAlimentoDto) {
    const alimento = this.alimentoRepository.create(createAlimentoDto);
    return this.alimentoRepository.save(alimento);
  }

  findAll() {
    return this.alimentoRepository.find();
  }

  findOne(id: number) {
    return this.alimentoRepository.findOne({ where: { id_alimento: id } });
  }

  async update(id: number, updateAlimentoDto: UpdateAlimentoDto) {
    const alimento = await this.alimentoRepository.findOne({
      where: { id_alimento: id },
    });
    if (!alimento) {
      throw new HttpException('Alimento not found', HttpStatus.NOT_FOUND);
    }
    const updatedAlimento = Object.assign(alimento, updateAlimentoDto);
    return this.alimentoRepository.save(updatedAlimento);
  }

  async remove(id: number) {
    const result = await this.alimentoRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Alimento not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Alimento deleted successfully' };
  }
}
