import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grado } from './entities/grado.entity';
import { CreateGradoDto } from './dto/create-grado.dto';
import { UpdateGradoDto } from './dto/update-grado.dto';

@Injectable()
export class GradoService {
  constructor(
    @InjectRepository(Grado)
    private readonly gradoRepository: Repository<Grado>,
  ) {}

  create(createGradoDto: CreateGradoDto) {
    const grado = this.gradoRepository.create(createGradoDto);
    return this.gradoRepository.save(grado);
  }

  findAll() {
    return this.gradoRepository.find();
  }

  findOne(id: number) {
    return this.gradoRepository.findOne({ where: { id_grado: id } });
  }

  async update(id: number, updateGradoDto: UpdateGradoDto) {
    const grado = await this.gradoRepository.findOne({
      where: { id_grado: id },
    });
    if (!grado) {
      throw new HttpException('Grado not found', HttpStatus.NOT_FOUND);
    }
    const updatedGrado = Object.assign(grado, updateGradoDto);
    return this.gradoRepository.save(updatedGrado);
  }

  async remove(id: number) {
    const result = await this.gradoRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Grado not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Grado deleted successfully' };
  }
}
