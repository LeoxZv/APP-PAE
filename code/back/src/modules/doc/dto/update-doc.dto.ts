import { PartialType } from '@nestjs/mapped-types';
import { CreateDocDto } from './create-doc.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateDocDto extends PartialType(CreateDocDto) {
  @IsOptional()
  @IsString()
  @Length(1, 55)
  nombre?: string;

  @IsOptional()
  @IsString()
  @Length(1, 15)
  siglas?: string;
}
