import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShowtimeEntity } from './showtime.entity';
import { SeatsEntity } from './seats.entity';
import { OrdersEntity } from './orders.entity';

@Entity('tickets')
export class TicketsEntity {
  @PrimaryGeneratedColumn()
  ticket_id: number;

  @Column()
  showtime_id: number;

  @Column()
  seat_id: number;

  @Column()
  order_id: number;

  @ManyToOne(() => ShowtimeEntity, (showtime) => showtime.tickets)
  @JoinColumn({ name: 'showtime_id' })
  showtime: ShowtimeEntity;

  @ManyToOne(() => SeatsEntity, (seat) => seat.tickets)
  @JoinColumn({ name: 'seat_id' })
  seat: SeatsEntity;

  @ManyToOne(() => OrdersEntity, (order) => order.tickets)
  @JoinColumn({ name: 'order_id' })
  order: OrdersEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 20, default: 'booked' })
  status: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
