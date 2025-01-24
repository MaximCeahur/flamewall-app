import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from 'src/modules/posts/entities/post.entity';
import { UserRankEnum } from './user-rank.enum';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { FriendRequest } from 'src/friends/entities/friend.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  minecraft_username: string;

  @Column({ type: 'timestamp' })
  first_login: Date;

  @Column({ type: 'varchar', length: 70 })
  description: string;

  @Column({ type: 'varchar', length: 40 })
  pfp_url: string;

  @Column({ type: 'enum', enum: UserRankEnum })
  rank: UserRankEnum;

  @Column({ type: 'varchar', length: 100 })
  minecraft_skin_url: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]; 
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]; 

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.requester)
  sentFriendRequests: FriendRequest[];

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.receiver)
  receivedFriendRequests: FriendRequest[];
}
