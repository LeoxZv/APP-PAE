import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Alimento {
  @PrimaryGeneratedColumn()
  id_alimento: number;

  @Column({ type: 'varchar', length: 120 })
  descripcion_alimento: string;
}
