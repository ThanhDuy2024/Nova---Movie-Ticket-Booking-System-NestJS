import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { loginDto, UserDto } from 'src/dto/create-user.dto';
import { UsersEntity } from 'src/Models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private usersEntity: Repository<UsersEntity>,
    private jwtService: JwtService,
  ) {}

  async postUser(userDto: UserDto) {
    try {
      const checkEmail = await this.usersEntity.findOneBy({
        email: userDto.email,
      });

      if (checkEmail) {
        throw new HttpException('Email is exist!', HttpStatus.BAD_REQUEST);
      }

      const saltOrRounds = 10;
      const password = userDto.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      userDto.password = hash;
      return {
        status: HttpStatus.OK,
        message: 'Account is register',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Email is exist!', HttpStatus.BAD_REQUEST);
    }
  }

  async userLogin(loginDto: loginDto) {
    try {
      const checkEmail = await this.usersEntity.findOneBy({
        email: loginDto.email,
      });

      const isMatch = await bcrypt.compare(
        loginDto.password,
        checkEmail.password,
      );

      if (!isMatch) {
        throw new HttpException(
          'Email or password is incorrect!',
          HttpStatus.BAD_REQUEST,
        );
      }
      const payload = { sub: checkEmail.id, username: checkEmail.username };
      return {
        status: HttpStatus.OK,
        message: 'Login complete',
        token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Email or password is incorrect!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
