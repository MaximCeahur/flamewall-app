import { Post } from '../entities/post.entity';

export class ReadPostDto {
  user_id: number;  // id пользователя
  username: string;
  title: string;
  content: string;

  constructor(post: Post) {
    // Доступ к ID пользователя через свойство `user`
    this.user_id = post.user ? post.user.user_id : null;  // Получаем id пользователя
    this.username = post.user ? post.user.username : null;
    this.title = post.title;
    this.content = post.content;
  }

  static fromEntity(post: Post): ReadPostDto {
    const dto = new ReadPostDto(post);
    return dto;  // Используем конструктор для преобразования
  }
}
