import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePublicPostDto, CreateAuthorizedPostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/modules/users/entities/user.entity'; // Import User entity
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)  // Inject User repository
    private usersRepository: Repository<User>, 
  ) {}

  // Create public post
  async createPublicPost(createPublicPostDto: CreatePublicPostDto): Promise<Post> {
    const user = await this.usersRepository.findOne({ where: { user_id: createPublicPostDto.userId } });
    if (!user) {
      throw new NotFoundException('Пользователь с указанным ID не найден');
    }

    const post = this.postsRepository.create({
      ...createPublicPostDto,
      user, // Associate post with user
    });

    return this.postsRepository.save(post);
  }

  // Create authorized post (for logged-in user)
  async createAuthorizedPost(createAuthorizedPostDto: CreateAuthorizedPostDto, userId: number): Promise<Post> {
    console.log('Creating post for userId:', userId); // Log userId for debugging
    const user = await this.usersRepository.findOne({ where: { user_id: userId } });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const post = this.postsRepository.create({
      ...createAuthorizedPostDto,
      user, // Associate post with the logged-in user
    });

    return this.postsRepository.save(post);
  }

  // Get all posts
  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['user'],  // Ensure user relation is loaded
    });
  }

  // Get post by ID
  async findOne(id: string): Promise<Post> {
    const postId = parseInt(id, 10); // Convert string ID to number
    const post = await this.postsRepository.findOne({
      where: { post_id: postId }, // Use the correct field name for post ID
      relations: ['user'],  // Ensure user is loaded with the post
    });

    if (!post) {
      throw new NotFoundException('Пост не найден');
    }

    return post;
  }

  // Update post
  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const postId = parseInt(id, 10); // Convert string ID to number
    const post = await this.postsRepository.findOne({ where: { post_id: postId } });

    if (!post) {
      throw new NotFoundException('Пост не найден');
    }

    // Update post fields and save
    await this.postsRepository.update(postId, updatePostDto);
    return this.postsRepository.findOne({
      where: { post_id: postId }, // Ensure we fetch the updated post
    });
  }

  // Delete post
  async remove(postId: number): Promise<void> {
    const post = await this.postsRepository.findOne({ where: { post_id: postId } });
    
    if (!post) {
      throw new NotFoundException('Пост не найден');
    }

    await this.postsRepository.delete(postId); // Delete post by ID
  }

  // Find posts by user ID
  async findAllUserPosts(userId: number): Promise<Post[]> {
    return this.postsRepository.find({
      where: { user: { user_id: userId } },  // Use user entity relation
      relations: ['user'],  // Ensure user data is included
    });
  }
}
