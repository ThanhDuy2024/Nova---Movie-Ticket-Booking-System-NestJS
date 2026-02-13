import { IsString } from 'class-validator';

export class QueryUrlDto {
  @IsString()
  status: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  search: string;
}
