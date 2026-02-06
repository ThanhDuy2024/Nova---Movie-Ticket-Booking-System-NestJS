/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class UpdateProfileAdminDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class UpdateProfileAdminDto2 {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  image?: string
}
