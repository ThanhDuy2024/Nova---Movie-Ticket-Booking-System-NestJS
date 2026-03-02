import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ShowtimeDto {
  @IsNumber()
  @IsNotEmpty()
  movie_id: number;

  @IsNumber()
  @IsNotEmpty()
  room_id: number;

  @IsString()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  end_time: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}
