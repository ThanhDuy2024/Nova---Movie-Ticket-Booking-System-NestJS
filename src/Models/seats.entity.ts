import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomsEntity } from './rooms.entity';

@Entity('seats')
export class SeatsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RoomsEntity, (roomEntity) => roomEntity.seats)
  @JoinColumn({ name: 'room_id' })
  room: RoomsEntity;

  @Column()
  seat_row: string;

  @Column()
  seat_number: number;

  @Column({ default: 'normal' })
  seat_type: string;

  @Column({ default: 'active' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  createdBy: number;

  @Column()
  updatedBy: number;
}
