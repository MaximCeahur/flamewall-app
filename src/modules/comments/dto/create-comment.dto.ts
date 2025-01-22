import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'This is a comment', description: 'Content of the comment' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 1, description: 'ID of the related post' })
  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @ApiProperty({ example: 1, description: 'ID of the user creating the comment' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export class CreateAuthorizedCommentDto {
    @ApiProperty({ example: 'This is a comment', description: 'Content of the comment' })
    @IsString()
    @IsNotEmpty()
    content: string;
  
    @ApiProperty({ example: 15, description: 'ID of the related post' })
    @IsNumber()
    @IsNotEmpty()
    postId: number;
  }
  