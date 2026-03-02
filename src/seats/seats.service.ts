/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeatsDto } from 'src/dto/create-seats.dto';
import { AdminEntity } from 'src/Models/admin.entity';
import { RoomsEntity } from 'src/Models/rooms.entity';
import { SeatsEntity } from 'src/Models/seats.entity';
import { LessThanOrEqual, Repository } from 'typeorm';

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

      const checkSeatName = await this.seatsEntity.findOne({
        where: {
          room: {
            id: seatDto.room_id,
            capacity: LessThanOrEqual(checkRoom.capacity),
          },
          seat_number: seatDto.seat_number,
        },
      });

      if (checkSeatName) {
        throw new HttpException('A seat name is exist', HttpStatus.BAD_REQUEST);
      }

      await this.seatsEntity.save([
        {
          room: { id: seatDto.room_id },
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

  async getSeat(query: any) {
    const findQuery: any = {
      relations: {
        room: true,
      },
      where: {},
      order: {
        updatedAt: 'DESC',
      },
    };

    if (query.roomFilter) {
      findQuery.where.room = { room_name: query.roomFilter };
    }

    if (query.seatType) {
      findQuery.where.seat_type = query.seatType;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const totalSeat = await this.seatsEntity.count(findQuery);
    const totalPage = Math.ceil(totalSeat / Number(query.limit));

    findQuery.take = Number(query.limit);
    findQuery.skip = 0;
    if (Number(query.page) > 0 && Number(query.page) >= totalPage) {
      const skip = (Number(query.page) - 1) * Number(query.limit);
      findQuery.skip = skip;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const listSeat = await this.seatsEntity.find(findQuery);

    const data: any = [];

    for (const item of listSeat) {
      const rawData: any = item;

      const checkCreatedBy = await this.adminEnitty.findOneBy({
        id: item.createdBy,
      });

      if (checkCreatedBy) {
        rawData.createdByName =
          checkCreatedBy.firstName + ' ' + checkCreatedBy.lastName;
      }

      const checkUpdatedBy = await this.adminEnitty.findOneBy({
        id: item.updatedBy,
      });

      if (checkUpdatedBy) {
        rawData.updatedByName =
          checkUpdatedBy.firstName + ' ' + checkUpdatedBy.lastName;
      }

      data.push(rawData);
    }

    return {
      status: HttpStatus.OK,
      data: data,
      totalPage: totalPage,
    };
  }
}
