import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Post } from 'src/modules/posts/entities/post.entity';
  import { User } from 'src/modules/users/entities/user.entity';
  
  @Entity('comments')
  export class Comment {
    @PrimaryGeneratedColumn()
    comment_id: number;
  
    @Column({ type: 'text' })
    content: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    // Связь с пользователем
    @ManyToOne(() => User, (user) => user.comments, { eager: false }) // Убедитесь, что это определено
    user: User;
    
    // Связь с постом
    @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
    post: Post;
  }
  