import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/servers/auth.module';
import { AdminEntity } from 'src/Models/admin.entity';
import { SeatsEntity } from 'src/Models/seats.entity';
import { SeatsController } from './seats.controller';
import { RoomsEntity } from 'src/Models/rooms.entity';
import { SeatsService } from './seats.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, SeatsEntity, RoomsEntity]),
    AuthModule,
  ],
  controllers: [SeatsController],
  providers: [SeatsService],
})
export class SeatsModule {}
