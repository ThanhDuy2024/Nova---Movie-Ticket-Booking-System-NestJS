import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomsEntity } from './rooms.entity';
import { TicketsEntity } from './ticket.entity';

@Entity('seats')
export class SeatsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RoomsEntity, (roomEntity) => roomEntity.seats)
  @JoinColumn({ name: 'room_id' })
  room: RoomsEntity;

  @OneToMany(() => TicketsEntity, (ticket) => ticket.seat)
  tickets: TicketsEntity[];

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
