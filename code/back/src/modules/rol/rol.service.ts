import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  create(createRolDto: CreateRolDto) {
    const rol = this.rolRepository.create(createRolDto);
    return this.rolRepository.save(rol);
  }

  findAll() {
    return this.rolRepository.find();
  }

  findOne(id: number) {
    return this.rolRepository.findOne({ where: { id_rol: id } });
  }

  async update(id: number, updateRolDto: UpdateRolDto) {
    const rol = await this.rolRepository.findOne({ where: { id_rol: id } });
    if (!rol) {
      throw new HttpException('Rol not found', HttpStatus.NOT_FOUND);
    }
    const updatedRol = Object.assign(rol, updateRolDto);
    return this.rolRepository.save(updatedRol);
  }

  async remove(id: number) {
    const result = await this.rolRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Rol not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Rol deleted successfully' };
  }
}
