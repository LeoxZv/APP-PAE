// src/modules/entrega/entities/entrega.entity.ts
import { Alimento } from 'src/modules/alimento/entities/alimento.entity';
import { Estudiante } from 'src/modules/estudiante/entities/estudiante.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Entrega {
  @PrimaryGeneratedColumn()
  id_entrega: number;

  @Column({ type: 'timestamp' })
  hora_entrega: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_emisor' })
  emisor: User;

  @ManyToOne(() => Estudiante)
  @JoinColumn({ name: 'id_receptor' })
  receptor: Estudiante;

  @ManyToOne(() => Alimento)
  @JoinColumn({ name: 'alimento_id' })
  alimento: Alimento;
}
