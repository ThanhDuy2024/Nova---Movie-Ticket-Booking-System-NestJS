import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoomsDto {
  @IsString()
  @IsNotEmpty()
  room_name: string;

  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @IsString()
  type: string;

  @IsString()
  status: string;
}
