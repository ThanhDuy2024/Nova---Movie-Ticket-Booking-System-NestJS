import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/dto/create-user.dto';

@Controller('client/user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  register(@Body() userDto: UserDto) {
    return this.usersService.postUser(userDto);
  }
}
