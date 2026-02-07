import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from 'src/Models/movies.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieEntity: Repository<MovieEntity>,
  ) {}

  createMovie(createMoviesDto: any, image: any) {
    return {
      createMoviesDto,
      image,
    };
  }
}
