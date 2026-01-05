import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body()
    body: {
      email: string;
      password: string;
      name: string;
      role: UserRole;
    },
  ) {
    return this.authService.signup(body);
  }
}
