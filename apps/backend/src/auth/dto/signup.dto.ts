import { IsEmail, IsNotEmpty, IsEnum, MinLength } from 'class-validator';
import { UserRole } from '@prisma/client';

export class SignupDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsEnum(UserRole)
  role: UserRole;
}
