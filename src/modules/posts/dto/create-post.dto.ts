import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicPostDto {
  @ApiProperty({ example: '1', description: 'ID пользователя, создающего пост' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 'My first post', description: 'Заголовок нового поста' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Post content', description: 'Текст нового поста' })
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class CreateAuthorizedPostDto {
  @ApiProperty({ example: 'Post title', description: 'Заголовок нового поста' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Post contents', description: 'Текст нового поста' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
