import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FriendRequest, FriendRequestStatus } from "./entities/friend.entity";
import { Repository } from "typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { RespondFriendRequestDto } from "./dto/respond-friend.dto";
import { FriendsController } from "./friends.controller";

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendRequest)
    private friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Отправить запрос на дружбу
  async sendFriendRequest(requester: User, receiver: User): Promise<FriendRequest> {
    // Проверка на существующий запрос
    const existingRequest = await this.friendRequestRepository.findOne({
      where: [
        { requester, receiver },
        { requester: receiver, receiver: requester },
      ],
    });

    if (existingRequest) {
      throw new BadRequestException('Запрос на дружбу уже существует');
    }

    // Создаём запрос дружбы
    const friendRequest = this.friendRequestRepository.create({
      requester,
      receiver,
      status: FriendRequestStatus.PENDING,
    });
    await this.friendRequestRepository.save(friendRequest);

    return friendRequest;
  }

  // Ответить на запрос дружбы
  async respondToFriendRequest(
    userId: number,
    { requestId, accept }: RespondFriendRequestDto,
  ): Promise<FriendRequest> {
    const friendRequest = await this.friendRequestRepository.findOne({
      where: { id: requestId },
    });

    if (!friendRequest) {
      throw new NotFoundException('Запрос не найден');
    }

    // Проверка, что пользователь может ответить на запрос
    if (friendRequest.receiver.user_id !== userId) {
      throw new BadRequestException('Вы не можете ответить на этот запрос');
    }

    friendRequest.status = accept ? FriendRequestStatus.ACCEPTED : FriendRequestStatus.REJECTED;
    return this.friendRequestRepository.save(friendRequest);  // возвращаем обновленный запрос
  }

  // Получить все запросы для пользователя
  async getFriendRequestsForUser(userId: number): Promise<FriendRequest[]> {
    return this.friendRequestRepository.find({
      where: [
        { receiver: { user_id: userId } },
        { requester: { user_id: userId } },
      ],
    });
  }
}
