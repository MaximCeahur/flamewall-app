// src/modules/auth/auth.controller.ts
import { Controller, Post, Body, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';
import { UsersService } from '../users/users.service';
import { ReadUserDto } from '../users/dto/read-user.dto';
import { plainToClass } from 'class-transformer';
import { CreateAuthorizedPostDto } from '../posts/dto/create-post.dto';
import { ReadPostDto } from '../posts/dto/read-post.dto';
import { PostsService } from '../posts/posts.service';

@ApiTags('Auth')
@ApiBearerAuth() // Указывает, что для всех эндпоинтов в этом контроллере требуется JWT
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly postService: PostsService,
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
  async getProfile(@Req() req: RequestWithUser): Promise<any> {
      const userId = req.user.user_id; // Получаем userId из запроса
      const user = await this.usersService.findById(userId);
      if (!user) throw new UnauthorizedException('Пользователь не найден');
      
      // Получаем посты пользователя
      const posts = await this.postService.findAllUserPosts(userId);
      
      // Преобразуем данные в нужный формат
      return {
        user: plainToClass(ReadUserDto, user),
        posts: posts.map(post => new ReadPostDto(post)), // Преобразуем посты в DTO
      };
  }

  @UseGuards(JwtAuthGuard)
  @Post('post')
  async createPost(@Body() createPostDto: CreateAuthorizedPostDto, @Req() req: RequestWithUser): Promise<ReadPostDto> {
    console.log('Request received to create post');
    
    // Логируем данные пользователя
    console.log('User from request:', req.user); 
 
    // Извлекаем userId из авторизованного пользователя
    const userId = req.user?.user_id;
    
    // Проверяем, если нет userId
    if (!userId) {
      console.log('No userId found in the request');
      throw new UnauthorizedException('Пользователь не авторизован');
    }
  
    console.log('Extracted userId:', userId); // Логируем userId
    
    // Логируем данные создаваемого поста
    console.log('CreatePostDto received:', createPostDto);
  
    // Пытаемся создать пост
    let post;
    try {
      post = await this.postService.createAuthorizedPost(createPostDto, userId);
      console.log('Post created successfully:', post);
    } catch (error) {
      console.error('Error creating post:', error);
      throw new Error('Ошибка при создании поста');
    }
  
    // Возвращаем DTO с постом
    return new ReadPostDto(post);
  }
}
