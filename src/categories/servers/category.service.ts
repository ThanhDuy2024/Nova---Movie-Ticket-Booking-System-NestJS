import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { CategoryEntity } from 'src/Models/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryEntity: Repository<CategoryEntity>,
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
}
