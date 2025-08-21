import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEntregaDto {
  @IsDate()
  @IsNotEmpty()
  hora_entrega: Date;

  @IsNotEmpty()
  @IsNumber()
  emisor: number; // ID del usuario emisor

  @IsNotEmpty()
  @IsNumber()
  receptor: number; // ID del usuario receptor

  @IsNotEmpty()
  @IsNumber()
  alimento: number; // ID del alimento entregado

  @IsNotEmpty()
  @IsNumber()
  cantidad: number; // Cantidad de alimento entregado
}
