import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/users/entities/user.entity';

export class ReadCommentDto {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор комментария' })
  comment_id: number;

  @ApiProperty({ example: 'This is a comment', description: 'Содержание комментария' })
  content: string;

  @ApiProperty({ example: '2023-12-15T14:48:00.000Z', description: 'Дата создания комментария' })
  created_at: Date;

  @ApiProperty({
    example: { user_id: 45, username: 'User123' },
    description: 'Информация о пользователе',
  })
  user_id: number;  // Убедитесь, что user_id отображается корректно

  user: Pick<User, 'user_id' | 'username'>;

  constructor(comment: any) {
    this.comment_id = comment.comment_id;
    this.content = comment.content;
    this.created_at = comment.created_at;
    this.user = {
      user_id: comment.user.user_id,
      username: comment.user.username,
    };
  }
}
