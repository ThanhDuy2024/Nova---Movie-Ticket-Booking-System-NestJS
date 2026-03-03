import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { loginDto, UserDto } from 'src/dto/create-user.dto';

@Controller('client/user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  register(@Body() userDto: UserDto) {
    return this.usersService.postUser(userDto);
  }

  @Post('login')
  login(@Body() loginDto: loginDto) {
    return this.usersService.userLogin(loginDto);
  }
}
