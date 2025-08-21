import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doc } from './entities/doc.entity';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';

@Injectable()
export class DocService {
  constructor(
    @InjectRepository(Doc)
    private readonly docRepository: Repository<Doc>,
  ) {}

  create(createDocDto: CreateDocDto) {
    const doc = this.docRepository.create(createDocDto);
    return this.docRepository.save(doc);
  }

  findAll() {
    return this.docRepository.find();
  }

  async findOne(id: number) {
    const doc = await this.docRepository.findOne({ where: { id_doc: id } });
    if (!doc) {
      throw new HttpException('Doc not found', HttpStatus.NOT_FOUND);
    }
    return doc;
  }

  async update(id: number, updateDocDto: UpdateDocDto) {
    const doc = await this.docRepository.findOne({ where: { id_doc: id } });
    if (!doc) {
      throw new HttpException('Doc not found', HttpStatus.NOT_FOUND);
    }
    const updatedDoc = Object.assign(doc, updateDocDto);
    return this.docRepository.save(updatedDoc);
  }

  async remove(id: number) {
    const result = await this.docRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Documento not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Documento deleted successfully' };
  }
}
