import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMoviesDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsString()
  @IsNotEmpty()
  release_date: Date;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  director?: string;

  @IsString()
  cast?: string;

  @IsString()
  trailer_url?: string;

  @IsString()
  status?: string;
}
