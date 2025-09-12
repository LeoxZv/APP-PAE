// src/modules/user/entities/user.entity.ts
import { Colegio } from 'src/modules/colegio/entities/colegio.entity';
import { Doc } from 'src/modules/doc/entities/doc.entity';
import { Rol } from 'src/modules/rol/entities/rol.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ type: 'varchar', length: 55 })
  nombre_user: string;

  @Column({ type: 'varchar', length: 55 })
  apellido_user: string;

  @Column({ type: 'varchar' })
  password_user: string;

  @Column({ type: 'varchar', length: 20 })
  numero_documento: string;

  @ManyToOne(() => Doc)
  @JoinColumn({ name: 'tipo_doc_id' }) // Especifica el nombre de la columna de la clave foránea
  tipo_doc: Doc;

  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'rol_id' }) // Especifica el nombre de la columna de la clave foránea
  rol: Rol;

  @ManyToOne(() => Colegio, (colegio) => colegio.users)
  @JoinColumn({ name: 'colegio_id' }) // Especifica el nombre de la columna de la clave foránea
  colegio: Colegio;
}
