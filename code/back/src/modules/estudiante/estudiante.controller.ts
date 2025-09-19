// src/modules/estudiante/estudiante.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Roles } from '../auth/roles/roles.decorator';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly EstudianteService: EstudianteService) {}

  @Post()
  @Roles(1, 4)
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.EstudianteService.create(createEstudianteDto);
  }

  @Get()
  @Roles(1, 2, 3, 4)
  findAll(@Req() req) {
    // <-- Ahora recibe el objeto de solicitud
    return this.EstudianteService.findAll(req.user); // <-- Pasa el usuario al servicio
  }

  @Get(':id')
  @Roles(1, 2, 3, 4)
  findOne(@Param('id') id: string) {
    return this.EstudianteService.findOne(+id);
  }

  @Patch(':id')
  @Roles(1, 4)
  update(
    @Param('id') id: string,
    @Body() updateEstudianteDto: UpdateEstudianteDto,
    @Req() req,
  ) {
    return this.EstudianteService.update(+id, updateEstudianteDto, req.user);
  }

  @Delete(':id')
  @Roles(1, 4)
  remove(@Param('id') id: string) {
    return this.EstudianteService.remove(+id);
  }
}
