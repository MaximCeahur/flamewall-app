import { Controller, Post, Body, Param, Put, Get, Req, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendRequest } from './entities/friend.entity';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { User } from 'src/modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RespondFriendRequestDto } from './dto/respond-friend.dto';

@ApiTags('Friends')
@ApiBearerAuth() // Это говорит Swagger, что для этого контроллера необходима аутентификация с токеном
@UseGuards(JwtAuthGuard)
@Controller('friends')
export class FriendsController {
  constructor(
    private readonly friendsService: FriendsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Отправить запрос на дружбу
  @Post('send/:receiverId')
  async sendFriendRequest(
    @Req() req: RequestWithUser,
    @Param('receiverId') receiverId: number,
  ): Promise<FriendRequest> {
    const requesterId = req.user.user_id;
    const requester = await this.userRepository.findOne({ where: { user_id: requesterId } });
    if (!requester) {
      throw new NotFoundException('Запрашивающий пользователь не найден');
    }
    
    const receiver = await this.userRepository.findOne({ where: { user_id: receiverId } });
    if (!receiver) {
      throw new NotFoundException('Получатель не найден');
    }
  
    return this.friendsService.sendFriendRequest(requester, receiver);
  }

  // Ответить на запрос дружбы
  @Put('respond')
  async respondToFriendRequest(
    @Req() req: RequestWithUser,
    @Body() body: RespondFriendRequestDto,
  ): Promise<FriendRequest> {
    return this.friendsService.respondToFriendRequest(req.user.user_id, body);
  }

  // Получить все запросы для пользователя
  @Get()
  async getFriendRequests(@Req() req: RequestWithUser): Promise<FriendRequest[]> {
    return this.friendsService.getFriendRequestsForUser(req.user.user_id);
  }
}
