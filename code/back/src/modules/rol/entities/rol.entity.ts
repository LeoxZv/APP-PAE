import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({ type: 'varchar', length: 55 })
  nombre_rol: string;

  @OneToMany(() => User, (user) => user.rol)
  users: User[];
}
