import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './users/servers/admins.module';
import { AuthModule } from './auth/servers/auth.module';
import { MoviesModule } from './movies/servers/movies.module';
import { MovieEntity } from './Models/movies.entity';
import { CategoryEntity } from './Models/category.entity';
import { AdminEntity } from './Models/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './categories/servers/category.module';
import { RoomsEntity } from './Models/rooms.entity';
import { RoomsModule } from './rooms/rooms.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [MovieEntity, CategoryEntity, AdminEntity, RoomsEntity],
        synchronize: false,
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT'),
        signOptions: { expiresIn: '30d' },
      }),
    }),
    AdminModule,
    AuthModule,
    MoviesModule,
    CategoryModule,
    RoomsModule,
  ],
})
export class AppModule {}
