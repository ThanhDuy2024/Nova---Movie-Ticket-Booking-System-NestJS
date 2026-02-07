import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { AuthModule } from 'src/auth/servers/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from 'src/configs/cloudinary/cloudinary.service';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/Models/movies.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([MovieEntity]),
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
  controllers: [MoviesController],
  providers: [CloudinaryService, MoviesService],
})
export class MoviesModule {}
