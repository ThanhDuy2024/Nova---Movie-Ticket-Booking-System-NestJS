/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/servers/auth.guard';
import { CloudinaryService } from 'src/configs/cloudinary/cloudinary.service';
import { MoviesService } from './movies.service';
import { CreateMoviesDto } from 'src/dto/create-movie.dto';

@Controller('admin/movie')
export class MoviesController {
  constructor(
    private cloudinaryService: CloudinaryService,
    private moviesService: MoviesService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('image_url'))
  async create(
    @Request() req,
    @Body() createMoviesDto: CreateMoviesDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let result: string = '';
    if (file) {
      const urlImage: any = await this.cloudinaryService.uploadFile(file);
      result = urlImage.secure_url;
    }
    return this.moviesService.createMovie(
      createMoviesDto,
      result,
      Number(req.user.id),
    );
  }
}
