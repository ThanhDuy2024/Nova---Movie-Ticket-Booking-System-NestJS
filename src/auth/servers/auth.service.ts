/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from 'src/dto/create-admin.dto';
import { AdminProfileDto } from 'src/dto/get-adminProfile.dto';
import { LoginAdminDto } from 'src/dto/login-admin.dto';
import { UpdateProfileAdminDto } from 'src/dto/put-profile.dto';
import { AdminService } from 'src/users/servers/admins.service';

@Injectable()
export class AuthService {
  constructor(private adminService: AdminService) {}

  signUp(createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  signIn(loginAdminDto: LoginAdminDto) {
    return this.adminService.findOne(loginAdminDto);
  }

  information(adminProfileDto: AdminProfileDto) {
    return this.adminService.adminInfor(adminProfileDto);
  }

  updateProfile(updateProfileAdminDto: UpdateProfileAdminDto, newImage: any) {
    const idNumber = Number(updateProfileAdminDto.id);
    delete updateProfileAdminDto.id;
    const data: any = {
      id: idNumber,
      ...updateProfileAdminDto,
    };

    if (newImage !== '') {
      data.image = newImage;
    }
    return this.adminService.updateProfileAdmin(data);
  }
}
