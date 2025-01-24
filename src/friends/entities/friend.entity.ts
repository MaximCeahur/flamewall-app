import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

export enum FriendRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

@Entity('friend_request')
export class FriendRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sentFriendRequests, { eager: true })
  requester: User;

  @ManyToOne(() => User, (user) => user.receivedFriendRequests, { eager: true })
  receiver: User;

  @Column({ type: 'enum', enum: FriendRequestStatus, default: FriendRequestStatus.PENDING })
  status: FriendRequestStatus; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
