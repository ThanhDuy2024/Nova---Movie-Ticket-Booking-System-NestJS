import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/Models/admin.entity';
import { MovieEntity } from 'src/Models/movies.entity';
import { RoomsEntity } from 'src/Models/rooms.entity';
import { ShowtimeEntity } from 'src/Models/showtime.entity';
import { ShowtimesController } from './showtimes.controller';
import { ShowtimesService } from './showtimes.service';
import { AuthModule } from 'src/auth/servers/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminEntity,
      MovieEntity,
      RoomsEntity,
      ShowtimeEntity,
    ]),
    AuthModule,
  ],
  controllers: [ShowtimesController],
  providers: [ShowtimesService],
})
export class ShowtimesModule {}
