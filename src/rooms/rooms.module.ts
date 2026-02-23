import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/servers/auth.module';
import { AdminEntity } from 'src/Models/admin.entity';
import { RoomsEntity } from 'src/Models/rooms.entity';
import { RoomsController } from './rooms.controller';
import { RoomService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomsEntity, AdminEntity]), AuthModule],
  controllers: [RoomsController],
  providers: [RoomService],
})
export class RoomsModule {}
