import { Controller, Get, Post, Body, Param, Put, Delete, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePublicPostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { ReadPostDto } from './dto/read-post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOperation({ summary: 'Создать пост (для любого пользователя)' })
  @ApiResponse({ status: 201, description: 'Пост успешно создан.', type: ReadPostDto })
  @Post()
  async create(@Body() createPostDto: CreatePublicPostDto): Promise<ReadPostDto> {
    const post = await this.postService.createPublicPost(createPostDto);
    return new ReadPostDto(post);
  }



  @ApiOperation({ summary: 'Получить все посты' })
  @ApiResponse({ status: 200, description: 'Все посты', type: [ReadPostDto] })
  @Get()
  async findAll(): Promise<ReadPostDto[]> {
    const posts = await this.postService.findAll();
    return posts.map(post => new ReadPostDto(post));
  }

  @ApiOperation({ summary: 'Получить пост по ID' })
  @ApiResponse({ status: 200, description: 'Найденный пост', type: [ReadPostDto] })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReadPostDto> {
    console.log(`Request received for post with id: ${id}`);

    const post = await this.postService.findOne(id);
    if (!post) {
      throw new NotFoundException('Пост не найден');
    }
    
    // Логируем данные поста
    console.log('Post found:', post);

    return new ReadPostDto(post);
  }

  @ApiOperation({ summary: 'Обновить пост' })
  @ApiResponse({ status: 200, description: 'Пост успешно обновлен.', type: ReadPostDto })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<ReadPostDto> {
    const post = await this.postService.update(id, updatePostDto);
    return new ReadPostDto(post);
  }

  @ApiOperation({ summary: 'Удалить пост' })
  @ApiResponse({ status: 200, description: 'Пост успешно удален.' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    // Преобразуем строку в число
    const postId = Number(id);
    return this.postService.remove(postId);
  }
}
