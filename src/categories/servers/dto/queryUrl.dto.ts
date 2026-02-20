import { IsString } from 'class-validator';

export class QueryUrlDto {
  @IsString()
  search: string;

  @IsString()
  page: string;

  @IsString()
  limit: string;
}
