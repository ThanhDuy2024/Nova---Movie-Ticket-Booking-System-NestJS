import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMoviesDto } from 'src/dto/create-movie.dto';
import { AdminEntity } from 'src/Models/admin.entity';
import { MovieEntity } from 'src/Models/movies.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieEntity: Repository<MovieEntity>,
    @InjectRepository(AdminEntity)
    private adminEntity: Repository<AdminEntity>,
  ) {}

  async createMovie(
    createMoviesDto: CreateMoviesDto,
    image: string,
    createdBy: number,
  ) {
    try {
      const check = await this.adminEntity.findOneBy({
        id: createdBy,
      });

      if (!check) {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }

      let data: object;
      if (image !== undefined) {
        data = {
          ...createMoviesDto,
          image_url: image,
          createdBy: createdBy,
          updatedBy: createdBy,
        };
      }
      await this.movieEntity.save(data);
      return {
        status: HttpStatus.OK,
        message: 'The movie has create complete',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
