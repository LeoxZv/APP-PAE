// src/modules/entrega/entrega.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EntregaService } from './entrega.service';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';

@Controller('entrega')
export class EntregaController {
  constructor(private readonly entregaService: EntregaService) {}

  // Endpoint para el escaneo de QR
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(1, 4) // O los roles que pueden registrar asistencias
  @Post('log/:id_estudiante')
  async createLog(
    @Param('id_estudiante') id_estudiante: number,
    @Request() req,
  ) {
    const id_emisor = req.user.id_user; // Obtener el ID del emisor del token de autenticación

    // Suponiendo que el alimento del día se obtiene por alguna lógica, aquí se usa un valor fijo
    const id_alimento = 1;

    return this.entregaService.createLog(
      +id_estudiante,
      id_emisor,
      id_alimento,
    );
  }

  // Endpoints CRUD existentes
  @Post()
  create(@Body() createEntregaDto: CreateEntregaDto) {
    return this.entregaService.create(createEntregaDto);
  }

  @Get()
  findAll() {
    return this.entregaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entregaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntregaDto: UpdateEntregaDto) {
    return this.entregaService.update(+id, updateEntregaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entregaService.remove(+id);
  }
}
