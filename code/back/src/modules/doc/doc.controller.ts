import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocService } from './doc.service';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';

@Controller('doc')
export class DocController {
  constructor(private readonly docService: DocService) {}

  @Post()
  create(@Body() createDocDto: CreateDocDto) {
    return this.docService.create(createDocDto);
  }

  @Get()
  findAll() {
    return this.docService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.docService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocDto: UpdateDocDto) {
    return this.docService.update(+id, updateDocDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.docService.remove(+id);
  }
}
