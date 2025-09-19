import { Colegio } from 'src/modules/colegio/entities/colegio.entity';
import { Doc } from 'src/modules/doc/entities/doc.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Grado } from '../../grado/entities/grado.entity';
import { Jornada } from 'src/modules/jornada/entities/jornada.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id_estudiante: number;

  @Column({ type: 'varchar', length: 55 })
  nombre_estudiante: string;

  @Column({ type: 'varchar', length: 55 })
  apellido_estudiante: string;

  @Column({ type: 'varchar', length: 20 })
  numero_documento: string;

  @ManyToOne(() => Grado)
  @JoinColumn({ name: 'grado_id' })
  grado: Grado;

  @ManyToOne(() => Jornada)
  @JoinColumn({ name: 'jornada_id' })
  jornada: Jornada;

  @ManyToOne(() => Doc)
  @JoinColumn({ name: 'tipo_doc_id' })
  tipo_doc: Doc;

  @ManyToOne(() => Colegio, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_colegio' })
  colegio: Colegio | null;
}
