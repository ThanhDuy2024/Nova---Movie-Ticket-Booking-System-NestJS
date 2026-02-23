/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsDto } from 'src/dto/create-room.dto';
import { AdminEntity } from 'src/Models/admin.entity';
import { RoomsEntity } from 'src/Models/rooms.entity';
import { Like, Repository } from 'typeorm';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomsEntity)
    private roomsEntity: Repository<RoomsEntity>,
    @InjectRepository(AdminEntity)
    private adminEntity: Repository<AdminEntity>,
  ) {}
  async postRoom(userId, roomsDto: RoomsDto) {
    const checkUserId = await this.adminEntity.findOneBy({
      id: userId,
    });

    if (!checkUserId) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const checkRoomName = await this.roomsEntity.findOneBy({
      room_name: roomsDto.room_name,
    });

    if (checkRoomName) {
      throw new HttpException('Room name is exist', HttpStatus.BAD_REQUEST);
    }

    const data: any = roomsDto;

    data.createdBy = userId;
    data.updatedBy = userId;

    await this.roomsEntity.save(data);
    return {
      status: HttpStatus.CREATED,
      message: 'A room create complete',
    };
  }

  async getRoom(queryDto: QueryDto) {
    const findQuery: any = {
      where: {},
      order: {
        updatedAt: 'DESC',
      },
    };

    if (queryDto.search) {
      findQuery.where.room_name = Like(`%${queryDto.search}%`);
    }

    if (queryDto.type) {
      findQuery.where.type = queryDto.type;
    }

    const totalRooms = await this.roomsEntity.count(findQuery);
    const totalPage = Math.ceil(totalRooms / Number(queryDto.limit));

    let skip = 0;
    if (Number(queryDto.page) > 0 && Number(queryDto.page) <= totalPage) {
      skip = (Number(queryDto.page) - 1) * Number(queryDto.limit);
    }

    findQuery.skip = skip;
    findQuery.take = Number(queryDto.limit);
    const roomList = await this.roomsEntity.find(findQuery);

    const data: any = [];
    for (const item of roomList) {
      const rawData: any = item;
      const userIdC = await this.adminEntity.findOneBy({
        id: item.createdBy,
      });

      const userIdU = await this.adminEntity.findOneBy({
        id: item.updatedBy,
      });

      rawData.createdByName = userIdC.firstName + ' ' + userIdC.lastName;
      rawData.updatedByName = userIdU.firstName + ' ' + userIdU.lastName;

      data.push(rawData);
    }
    return {
      status: HttpStatus.OK,
      data: data,
      totalPage: totalPage,
    };
  }
}
