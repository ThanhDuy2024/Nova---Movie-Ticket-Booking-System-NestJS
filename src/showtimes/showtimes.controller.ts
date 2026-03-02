import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/servers/auth.guard';
import { ShowtimesService } from './showtimes.service';
import { ShowtimeDto } from 'src/dto/create-showtime.dto';

@Controller('admin/showtime')
export class ShowtimesController {
  constructor(private showtimeService: ShowtimesService) {}
  @UseGuards(AuthGuard)
  @Post('create')
  createShowtime(@Body() showtimeDto: ShowtimeDto, @Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.showtimeService.postShowtime(showtimeDto, req.user.id);
  }
}
