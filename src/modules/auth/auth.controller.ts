// src/modules/auth/auth.controller.ts
import { Controller, Post, Body, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';
import { UsersService } from '../users/users.service';

@ApiTags('Auth')
@ApiBearerAuth() // Указывает, что для всех эндпоинтов в этом контроллере требуется JWT
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: RequestWithUser) {
    const userId = req.user.userId; // Теперь TypeScript не будет выдавать ошибку
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('Пользователь не найден');
    return user;
  }
}
