/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeatsDto } from 'src/dto/create-seats.dto';
import { AdminEntity } from 'src/Models/admin.entity';
import { RoomsEntity } from 'src/Models/rooms.entity';
import { SeatsEntity } from 'src/Models/seats.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(SeatsEntity) private seatsEntity: Repository<SeatsEntity>,
    @InjectRepository(RoomsEntity) private roomsEntity: Repository<RoomsEntity>,
    @InjectRepository(AdminEntity) private adminEnitty: Repository<AdminEntity>,
  ) {}

  async postSeat(seatDto: SeatsDto, userId) {
    try {
      const checkRoom = await this.roomsEntity.findOneBy({
        id: seatDto.room_id,
      });

      if (!checkRoom) {
        throw new HttpException(
          'A room_id is not exist!',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.seatsEntity.save([
        {
          room_id: { id: seatDto.room_id },
          seat_number: seatDto.seat_number,
          seat_row: seatDto.seat_row,
          seat_type: seatDto.seat_type,
          status: seatDto.status,
          createdBy: userId,
          updatedBy: userId,
        },
      ]);
      return {
        status: HttpStatus.OK,
        message: 'A seats create complete',
      };
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
