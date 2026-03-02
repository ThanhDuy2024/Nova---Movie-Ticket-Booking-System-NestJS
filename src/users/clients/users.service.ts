import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/create-user.dto';
import { UsersEntity } from 'src/Models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private usersEntity: Repository<UsersEntity>,
  ) {}

  async postUser(userDto: UserDto) {
    try {
      const saltOrRounds = 10;
      const password = userDto.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      userDto.password = hash;
      console.log(userDto);
      return {
        status: HttpStatus.OK,
        message: 'Account is register',
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('bad request');
    }
  }
}
