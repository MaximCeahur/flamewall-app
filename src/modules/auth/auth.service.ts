import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRankEnum } from '../users/entities/user-rank.enum';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  // Регистрация пользователя
  async register(registerDto: RegisterDto) {
    const { password, ...userData } = registerDto; // Извлекаем нужные данные

    // Создание нового пользователя с правильными полями
    const newUser: CreateUserDto = {
      ...userData,
      password: await bcrypt.hash(password, 10),
      first_login: new Date(), // Установить значение по умолчанию
      description: '', // Значение по умолчанию для описания
      pfp_url: '', // Значение по умолчанию для URL аватара
      minecraft_skin_url: '', // Значение по умолчанию для URL скина
      rank: UserRankEnum.DEFAULT, // Используйте значение по умолчанию из перечисления
      minecraft_username: '', // Добавляем поле minecraft_username
    };
    return this.usersService.create(newUser);
  }

  // Логин пользователя и генерация JWT
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto; // Извлекаем email и пароль из DTO
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Неверные учетные данные');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Неверные учетные данные');

    // Генерация JWT токена
    const payload = { userId: user.user_id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
