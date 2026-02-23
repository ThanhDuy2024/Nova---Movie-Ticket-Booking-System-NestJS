import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rooms')
export class RoomsEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
