/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowtimeDto } from 'src/dto/create-showtime.dto';
import { AdminEntity } from 'src/Models/admin.entity';
import { MovieEntity } from 'src/Models/movies.entity';
import { ShowtimeEntity } from 'src/Models/showtime.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShowtimesService {
  constructor(
    @InjectRepository(ShowtimeEntity)
    private showtimeEntity: Repository<ShowtimeEntity>,
    @InjectRepository(AdminEntity)
    private adminEntity: Repository<AdminEntity>,
    @InjectRepository(MovieEntity)
    private movieEntity: Repository<MovieEntity>,
  ) {}

  async postShowtime(showtimeDto: ShowtimeDto, userId) {
    const conflict = await this.showtimeEntity
      .createQueryBuilder('showtime')
      .where('showtime.room_id = :room_id', { room_id: showtimeDto.room_id })
      .andWhere(
        'showtime.start_time < :newEnd AND showtime.end_time > :newStart',
        {
          newEnd: showtimeDto.end_time,
          newStart: showtimeDto.start_time,
        },
      )
      .getOne();
    if (conflict) {
      throw new BadRequestException(
        'Phòng đã có suất chiếu trong thời gian này',
      );
    }

    const checkMovie = await this.movieEntity.findOneBy({
      id: showtimeDto.movie_id,
    });

    if (!checkMovie) {
      throw new BadRequestException('The movie is not exist');
    }

    const createShowtime = this.showtimeEntity.create({
      movie_id: showtimeDto.movie_id,
      room_id: showtimeDto.room_id,
      status: showtimeDto.status,
      start_time: showtimeDto.start_time,
      end_time: showtimeDto.end_time,
      price: showtimeDto.price,
      updatedBy: userId,
      createdBy: userId,
    });

    await this.showtimeEntity.save(createShowtime);

    return {
      status: HttpStatus.ACCEPTED,
      message: 'A showtime create complete',
    };
  }
}
