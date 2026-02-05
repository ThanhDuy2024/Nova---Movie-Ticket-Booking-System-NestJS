/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { CreateAdminDto } from 'src/dto/create-admin.dto';
import { AuthService } from './auth.service';
import { LoginAdminDto } from 'src/dto/login-admin.dto';
import { AuthGuard } from './auth.guard';

@Controller('admin/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
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
    return req.user;
  }
}
