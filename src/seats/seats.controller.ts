import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { SeatsDto } from 'src/dto/create-seats.dto';
import { SeatsService } from './seats.service';
import { AuthGuard } from 'src/auth/servers/auth.guard';

@Controller('admin/seat')
export class SeatsController {
  constructor(private seatsService: SeatsService) {}
  @UseGuards(AuthGuard)
  @Post('create')
  createSeat(@Body() seatsDto: SeatsDto, @Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.seatsService.postSeat(seatsDto, req.user.id);
  }
}
