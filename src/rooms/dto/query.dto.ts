import { IsString } from 'class-validator';

export class QueryDto {
  @IsString()
  search: string;

  @IsString()
  page: string;

  @IsString()
  limit: string;

  @IsString()
  type: string;

  @IsString()
  status: string;
}
