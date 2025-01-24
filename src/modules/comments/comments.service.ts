import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entities/user.entity';
import { CreateAuthorizedCommentDto } from './dto/create-comment.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    
    @InjectRepository(User)
    private userRepository: Repository<User>,  // Внедрение репозитория пользователя
    
    @InjectRepository(Post)
    private postRepository: Repository<Post> ,  // Внедрение репозитория поста

    @InjectRepository(Comment) private readonly commentsRepository: Repository<Comment>,
    private readonly usersService: UsersService, // Внедрение UsersService
    
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const { userId, postId, content } = createCommentDto;
    
    // Получаем пользователя и пост из базы данных
    const user = await this.userRepository.findOne({ where: { user_id: userId } });
    const post = await this.postRepository.findOne({ where: { post_id: postId } });
    
    
    if (!user || !post) {
      throw new NotFoundException('User or Post not found');
    }
    
    // Создаем новый комментарий
    const comment = this.commentRepository.create({
      content,
      user,
      post,
    });
  
    return await this.commentRepository.save(comment);
  }

  async findAll() {
    return await this.commentRepository.find({
      relations: ['user', 'post'],
    });
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { comment_id: id },
      relations: ['user', 'post'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.preload({
      comment_id: id,
      ...updateCommentDto,
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return await this.commentRepository.save(comment);
  }

  async remove(id: number) {
    const result = await this.commentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return { message: `Comment with ID ${id} has been deleted` };
  }

  async createAuthorizedComment(createCommentDto: CreateAuthorizedCommentDto, userId: number) {
    const { content, postId } = createCommentDto; // Деструктурируем content и postId из DTO
  
    // Найдите пост в базе данных
    const post = await this.postRepository.findOne({
      where: { post_id: postId }, // Укажите поле, по которому выполняется поиск
    });
    
  
    if (!post) {
      throw new NotFoundException('Пост не найден');
    }
  
    // Создайте комментарий с привязкой к посту
    const comment = this.commentsRepository.create({
      content, // Теперь content доступен
      user: { user_id: userId }, // Привязка к пользователю
      post: post,               // Привязка к посту
    });
  
    return await this.commentsRepository.save(comment);
  }
  
}
