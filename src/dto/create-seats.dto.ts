import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SeatsDto {
  @IsNumber()
  @IsNotEmpty()
  room_id: number;

  @IsString()
  @IsNotEmpty()
  seat_row: string;

  @IsNumber()
  @IsNotEmpty()
  seat_number: number;

  @IsString()
  @IsNotEmpty()
  seat_type: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
