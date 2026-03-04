import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { MovieEntity } from './movies.entity';
import { RoomsEntity } from './rooms.entity';
import { TicketsEntity } from './ticket.entity';

@Entity('showtimes')
export class ShowtimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movie_id: number;

  @Column()
  room_id: number;

  @ManyToOne(() => MovieEntity, (movie) => movie.showtimes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;

  @ManyToOne(() => RoomsEntity, (room) => room.showtimes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'room_id' })
  room: RoomsEntity;

  @OneToMany(() => TicketsEntity, (ticket) => ticket.showtime)
  tickets: TicketsEntity[];

  @Column({ type: 'datetime' })
  start_time: Date;

  @Column({ type: 'datetime' })
  end_time: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

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
