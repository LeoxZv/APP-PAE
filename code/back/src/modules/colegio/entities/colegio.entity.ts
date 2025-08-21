import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Colegio {
  @PrimaryGeneratedColumn()
  id_colegio: number;

  @Column({ type: 'varchar', length: 55 })
  nombre_colegio: string;

  @Column({ type: 'varchar', length: 55 })
  direccion_colegio: string;

  @OneToMany(() => User, (user) => user.colegio)
  users: User[];
}
