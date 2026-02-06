import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from 'src/dto/create-admin.dto';
import { AdminProfileDto } from 'src/dto/get-adminProfile.dto';
import { LoginAdminDto } from 'src/dto/login-admin.dto';
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
}
