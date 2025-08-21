import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ColegioService } from './colegio.service';
import { CreateColegioDto } from './dto/create-colegio.dto';
import { UpdateColegioDto } from './dto/update-colegio.dto';

@Controller('colegio')
export class ColegioController {
  constructor(private readonly colegioService: ColegioService) {}

  @Post()
  create(@Body() createColegioDto: CreateColegioDto) {
    return this.colegioService.create(createColegioDto);
  }

  @Get()
  findAll() {
    return this.colegioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colegioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColegioDto: UpdateColegioDto) {
    return this.colegioService.update(+id, updateColegioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colegioService.remove(+id);
  }
}
