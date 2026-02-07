import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMoviesDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsNotEmpty()
  release_date: string;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  cast: string;

  @IsString()
  trailer_url: string;

  @IsString()
  status: string;
}
