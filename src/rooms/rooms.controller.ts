/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/servers/auth.guard';
import { RoomService } from './rooms.service';
import { RoomsDto } from 'src/dto/create-room.dto';
import { QueryDto } from './dto/query.dto';

@Controller('admin/room')
export class RoomsController {
  constructor(private roomsService: RoomService) {}
  @UseGuards(AuthGuard)
  @Post('create')
  createRoom(@Request() req, @Body() roomsDto: RoomsDto) {
    return this.roomsService.postRoom(Number(req.user.id), roomsDto);
  }

  @UseGuards(AuthGuard)
  @Get('list')
  listRoom(@Query() queryDto: QueryDto) {
    return this.roomsService.getRoom(queryDto);
  }

  @UseGuards(AuthGuard)
  @Put('edit/:id')
  updateRoom(
    @Param('id') id: string,
    @Request() req,
    @Body() roomsDto: RoomsDto,
  ) {
    return this.roomsService.putRoom(req.user.id, roomsDto, Number(id));
  }
}
