import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SeatsEntity } from './seats.entity';
import { ShowtimeEntity } from './showtime.entity';

@Entity('rooms')
export class RoomsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => SeatsEntity, (seatsEntity) => seatsEntity.room, {
    cascade: true, //Giup save room + seats duoc generate ra san
  })
  seats: SeatsEntity[];

  @OneToMany(() => ShowtimeEntity, (showtime) => showtime.room)
  showtimes: ShowtimeEntity[];

  @Column({ nullable: false })
  room_name: string;

  @Column({ nullable: false })
  capacity: number;

  @Column()
  type: string;

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
