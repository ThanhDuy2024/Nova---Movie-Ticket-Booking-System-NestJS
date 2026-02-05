import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/Models/admin.entity';
import { AdminService } from './admins.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT'),
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
