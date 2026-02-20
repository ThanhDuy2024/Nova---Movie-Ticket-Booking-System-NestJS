/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMoviesDto } from 'src/dto/create-movie.dto';
import { AdminEntity } from 'src/Models/admin.entity';
import { CategoryEntity } from 'src/Models/category.entity';
import { MovieEntity } from 'src/Models/movies.entity';
import { Between, In, Like, Repository } from 'typeorm';
import { QueryUrlDto } from './dto/queryUrl.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieEntity: Repository<MovieEntity>,
    @InjectRepository(AdminEntity)
    private adminEntity: Repository<AdminEntity>,
    @InjectRepository(CategoryEntity)
    private categoryEntity: Repository<CategoryEntity>,
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
      const movie = new MovieEntity();
      movie.title = createMoviesDto.title;
      movie.cast = createMoviesDto.cast;

      const categoryIds: number[] = JSON.parse(createMoviesDto.categories);
      const categories = await this.categoryEntity.findBy({
        id: In(categoryIds),
      });
      movie.categories = movie.categories = categories;
      movie.description = createMoviesDto.description;
      movie.createdBy = createdBy;
      movie.director = createMoviesDto.director;
      movie.duration = createMoviesDto.duration;
      movie.language = createMoviesDto.language;
      movie.release_date = String(createMoviesDto.release_date);
      movie.status = createMoviesDto.status;
      movie.trailer_url = createMoviesDto.trailer_url;
      movie.updatedBy = createdBy;

      if (image !== undefined) {
        movie.image_url = image;
      }
      await this.movieEntity.manager.save(movie);
      return {
        status: HttpStatus.OK,
        message: 'The movie has create complete',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async getMovie(queryUrl: QueryUrlDto) {
    try {
      const findQuery: any = {
        relations: {
          categories: true,
        },
        where: {},
        order: {
          createdAt: 'DESC',
        },
      };

      const totalMovie = await this.movieEntity.count(findQuery);
      const totalPage = Math.ceil(totalMovie / Number(queryUrl.limit));
      let skip = 0;
      if (Number(queryUrl.page) > 0 && Number(queryUrl.page) <= totalPage) {
        const pageNumber = Number(queryUrl.page);
        skip = (pageNumber - 1) * Number(queryUrl.limit);
      }

      findQuery.skip = skip;
      findQuery.take = Number(queryUrl.limit);

      if (queryUrl.status == 'inactive' || queryUrl.status == 'active') {
        findQuery.where.status = queryUrl.status;
      }

      if (queryUrl.startDate && queryUrl.endDate) {
        findQuery.where.release_date = Between(
          queryUrl.startDate,
          queryUrl.endDate,
        );
      }

      if (queryUrl.search) {
        findQuery.where.title = Like(`%${queryUrl.search}%`);
      }
      const movieList = await this.movieEntity.find(findQuery);

      const data: Array<object> = [];

      for (const item of movieList) {
        const rawData: any = item;
        const checkUser1 = this.adminEntity.findOneBy({
          id: item.createdBy,
          isActive: 'active',
        });

        if (checkUser1) {
          rawData.createdByAdmin =
            (await checkUser1).firstName + (await checkUser1).lastName;
        } else {
          rawData.updatedByAdmin = 'none';
        }

        const checkUser2 = await this.adminEntity.findOneBy({
          id: item.updatedBy,
          isActive: 'active',
        });

        if (checkUser2) {
          rawData.updatedByAdmin = checkUser2.firstName + checkUser2.lastName;
        } else {
          rawData.updatedByAdmin = 'none';
        }

        data.push(rawData);
      }
      return {
        status: HttpStatus.OK,
        data: data,
        totalPage: totalPage,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
