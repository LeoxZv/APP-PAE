import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Doc {
  @PrimaryGeneratedColumn()
  id_doc: number;

  @Column({ type: 'varchar', length: 55 })
  nombre: string;

  @Column({ type: 'varchar', length: 15 })
  siglas: string;

  @OneToMany(() => User, (User) => User.tipo_doc)
  users: User[];
}
