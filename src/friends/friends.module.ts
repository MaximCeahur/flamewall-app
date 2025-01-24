import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { FriendRequest } from './entities/friend.entity';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest]), UsersModule],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}