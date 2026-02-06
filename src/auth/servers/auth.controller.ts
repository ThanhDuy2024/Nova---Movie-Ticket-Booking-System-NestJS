/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateAdminDto } from 'src/dto/create-admin.dto';
import { AuthService } from './auth.service';
import { LoginAdminDto } from 'src/dto/login-admin.dto';
import { AuthGuard } from './auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/configs/cloudinary/cloudinary.service';
import { UpdateProfileAdminDto } from 'src/dto/put-profile.dto';

@Controller('admin/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @Post('register')
  register(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signUp(createAdminDto);
  }

  @Post('login')
  login(@Body() loginAdminDto: LoginAdminDto) {
    return this.authService.signIn(loginAdminDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return this.authService.information(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  @UseInterceptors(FileInterceptor('image'))
  async putProfile(
    @Body() updateProfileAdminDto: UpdateProfileAdminDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let result: any;
    if (file) {
      const urlImage: any = await this.cloudinaryService.uploadFile(file);
      result = urlImage.secure_url;
    } else {
      result = '';
    }
    return this.authService.updateProfile(updateProfileAdminDto, result);
  }
}
