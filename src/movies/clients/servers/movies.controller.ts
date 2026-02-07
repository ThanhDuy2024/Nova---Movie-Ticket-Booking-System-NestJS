/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/servers/auth.guard';
import { CloudinaryService } from 'src/configs/cloudinary/cloudinary.service';
import { MoviesService } from './movies.service';

@Controller('admin/movie')
export class MoviesController {
  constructor(
    private cloudinaryService: CloudinaryService,
    private moviesService: MoviesService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('image_url'))
  async create(@Body() req: any, @UploadedFile() file?: Express.Multer.File) {
    let result: any;
    if (file) {
      const urlImage: any = await this.cloudinaryService.uploadFile(file);
      result = urlImage.secure_url;
    } else {
      result = '';
    }
    return this.moviesService.createMovie(req, result);
  }
}
