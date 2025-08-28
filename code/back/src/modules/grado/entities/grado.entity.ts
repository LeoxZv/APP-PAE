import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Grado {
  @PrimaryGeneratedColumn()
  id_grado: number;

  @Column({ type: 'varchar', length: 10 })
  numero_grado: string;
}
