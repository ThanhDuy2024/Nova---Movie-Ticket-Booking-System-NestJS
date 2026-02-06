import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/users/servers/admins.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryService } from 'src/configs/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/configs/cloudinary/cloudinary.module';

@Module({
  imports: [
    AdminModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT'),
        signOptions: { expiresIn: '30d' },
      }),
    }),
    CloudinaryModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, CloudinaryService],
})
export class AuthModule {}
