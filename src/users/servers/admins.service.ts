/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from 'src/dto/create-admin.dto';
import { AdminEntity } from 'src/Models/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginAdminDto } from 'src/dto/login-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { AdminProfileDto } from 'src/dto/get-adminProfile.dto';
import { adminProfileInterface } from 'src/interfaces/adminProfile.interface';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    private jwtService: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      const checkEmail = await this.adminRepository.findOneBy({
        email: createAdminDto.email,
      });

      if (checkEmail) {
        throw new HttpException(
          'Email has been existed',
          HttpStatus.BAD_REQUEST,
        );
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(createAdminDto.password, salt);
      createAdminDto.password = hash;
      await this.adminRepository.save(createAdminDto);
      return {
        status: HttpStatus.OK,
        message: 'Complete',
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(loginAdminDto: LoginAdminDto) {
    try {
      const check = await this.adminRepository.findOneBy({
        email: loginAdminDto.email,
        isActive: 'active',
      });

      const checkPassword = await bcrypt.compare(
        loginAdminDto.password,
        check.password,
      );

      if (!checkPassword) {
        throw new HttpException(
          'Email or password failed',
          HttpStatus.NOT_FOUND,
        );
      }

      const payload = {
        id: check.id,
        firstName: check.firstName,
        lastName: check.lastName,
      };

      return {
        adminToken: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Email or password failed', HttpStatus.NOT_FOUND);
    }
  }

  async adminInfor(adminProfileDto: AdminProfileDto) {
    const profileAdmin = await this.adminRepository.findOneBy({
      id: adminProfileDto.id,
      isActive: 'active',
    });

    if (!profileAdmin) {
      throw new HttpException(
        'Your account has been banned!',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const data: adminProfileInterface = {
      id: profileAdmin.id,
      firstName: profileAdmin.firstName,
      lastName: profileAdmin.lastName,
      email: profileAdmin.email,
      role: profileAdmin.role || '',
      isActive: profileAdmin.isActive,
      image: profileAdmin.image || '',
      createdAt: profileAdmin.createdAt,
      updatedAt: profileAdmin.updatedAt,
    };

    return data;
  }
}
