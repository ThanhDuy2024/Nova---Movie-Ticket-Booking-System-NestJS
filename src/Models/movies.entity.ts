import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  duration: string;

  @Column()
  release_date: string;

  @Column()
  language: string;

  @Column({ nullable: true })
  director: string;

  @Column({ nullable: true })
  cast: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  trailer_url: string;

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
