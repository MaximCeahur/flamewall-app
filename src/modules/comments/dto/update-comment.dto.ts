import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiPropertyOptional({ example: 'Updated comment content', description: 'Обновленное содержание комментария' })
  content?: string;

  @ApiPropertyOptional({ example: 456, description: 'ID поста, к которому относится комментарий' })
  postId?: number;

  @ApiPropertyOptional({ example: 78, description: 'ID пользователя, оставившего комментарий' })
  userId?: number;
}
