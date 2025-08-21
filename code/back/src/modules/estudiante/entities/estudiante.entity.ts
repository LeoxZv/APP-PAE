import { Colegio } from 'src/modules/colegio/entities/colegio.entity';
import { Doc } from 'src/modules/doc/entities/doc.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id_estudiante: number;
  @Column({ type: 'varchar', length: 55 })
  nombre_user: string;
  @Column({ type: 'varchar', length: 55 })
  apellido_user: string;
  @Column({ type: 'varchar', length: 20 })
  numero_documento: string;
  @Column({ type: 'varchar', length: 15 })
  grado: string;
  @Column({ type: 'varchar', length: 15 })
  jornada: string;

  @ManyToOne(() => Doc, (doc) => doc.id_doc)
  tipo_doc: Doc;

  @ManyToOne(() => Colegio, (colegio) => colegio.users)
  colegio: Colegio;
}
