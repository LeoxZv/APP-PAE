import { Colegio } from 'src/modules/colegio/entities/colegio.entity';
import { Doc } from 'src/modules/doc/entities/doc.entity';
import { Rol } from 'src/modules/rol/entities/rol.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;
  @Column({ type: 'varchar', length: 55 })
  nombre_user: string;

  @Column({ type: 'varchar', length: 55 })
  apellido_user: string;

  @Column({ type: 'varchar', length: 20 })
  numero_documento: string;

  @ManyToOne(() => Doc, (doc) => doc.id_doc)
  tipo_doc: Doc;

  @ManyToOne(() => Rol, (rol) => rol.id_rol)
  rol: Rol;

  @ManyToOne(() => Colegio, (colegio) => colegio.users)
  colegio: Colegio;
}
