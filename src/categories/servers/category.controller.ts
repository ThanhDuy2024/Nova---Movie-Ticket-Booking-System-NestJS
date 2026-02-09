/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/servers/auth.guard';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { CategoryService } from './category.service';

@Controller('admin/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @UseGuards(AuthGuard)
  @Post('create')
  postCategory(@Request() req, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(
      createCategoryDto,
      Number(req.user.id),
    );
  }
}
