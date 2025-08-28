import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Jornada {
  @PrimaryGeneratedColumn()
  id_jornada: number;

  @Column({ type: 'varchar', length: 20 })
  nombre_jornada: string;
}
