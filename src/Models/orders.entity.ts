import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UsersEntity } from './user.entity';
import { TicketsEntity } from './ticket.entity';

@Entity('orders')
export class OrdersEntity {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => UsersEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @OneToMany(() => TicketsEntity, (ticket) => ticket.order)
  tickets: TicketsEntity[];

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total_amount: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  order_date: Date;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
