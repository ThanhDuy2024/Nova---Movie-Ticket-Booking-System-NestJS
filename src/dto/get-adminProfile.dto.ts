import { IsNumber } from 'class-validator';

export class AdminProfileDto {
  @IsNumber()
  id: number;
}
