import { Colegio } from 'src/modules/colegio/entities/colegio.entity';
import { Doc } from 'src/modules/doc/entities/doc.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Grado, (grado) => grado.id_grado)
  id_grado: Grado;

  @ManyToOne(() => Jornada, (jornada) => jornada.id_jornada)
  id_jornada: Jornada;

  @ManyToOne(() => Doc, (doc) => doc.id_doc)
  id_doc: Doc;

  @ManyToOne(() => Colegio, (colegio) => colegio.users)
  colegio: Colegio;
}
