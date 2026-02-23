import {
  Body,
  Controller,
  Get,
  Post,
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.roomsService.postRoom(Number(req.user.id), roomsDto);
  }

  @UseGuards(AuthGuard)
  @Get('list')
  listRoom(@Query() queryDto: QueryDto) {
    return this.roomsService.getRoom(queryDto);
  }
}
