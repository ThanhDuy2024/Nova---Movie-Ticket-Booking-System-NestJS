/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { AdminEntity } from 'src/Models/admin.entity';
import { CategoryEntity } from 'src/Models/category.entity';
import { Like, Repository } from 'typeorm';
import { QueryUrlDto } from './dto/queryUrl.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryEntity: Repository<CategoryEntity>,
    @InjectRepository(AdminEntity)
    private adminEntity: Repository<AdminEntity>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto, userId: number) {
    try {
      const data = {
        ...createCategoryDto,
        createdBy: userId,
        updatedBy: userId,
      };

      await this.categoryEntity.save(data);
      return {
        status: HttpStatus.OK,
        message: 'A category has created',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async categoryList(queryUrlDto: QueryUrlDto) {
    const findQuery: any = {
      where: {},
    };

    if (queryUrlDto.search) {
      findQuery.where.name = Like(`%${queryUrlDto.search}%`);
    }

    const totalCategory = await this.categoryEntity.count(findQuery);
    const totalPage = Math.ceil(totalCategory / Number(queryUrlDto.limit));

    let skip = 0;
    if (Number(queryUrlDto.page) > 0 && Number(queryUrlDto.page) <= totalPage) {
      skip = (Number(queryUrlDto.page) - 1) * Number(queryUrlDto.limit);
    }
    findQuery.take = Number(queryUrlDto.limit);
    findQuery.skip = skip;
    const categories = await this.categoryEntity.find(findQuery);
    const data: any = [];

    for (const item of categories) {
      const rawData: any = item;
      const check1 = await this.adminEntity.findOneBy({
        id: item.createdBy,
      });

      if (check1) {
        rawData.createdByName = check1.firstName + check1.lastName;
      }

      const check2 = await this.adminEntity.findOneBy({
        id: item.updatedBy,
      });

      if (check2) {
        rawData.updatedByName = check2.firstName + check2.lastName;
      }

      data.push(rawData);
    }

    return {
      status: HttpStatus.OK,
      data: data,
      totalPage: totalPage,
    };
  }
}
