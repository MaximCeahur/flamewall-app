import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto'; // Импортируем DTO
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto); // Создаем объект User на основе DTO
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { user_id: id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.findOne(id); // Проверка на существование
    await this.usersRepository.update(id, user);
    return this.findOne(id); // Возвращаем обновленного пользователя
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Проверка на существование
    await this.usersRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
}

async findById(userId: number): Promise<User | undefined> {
  return await this.usersRepository.findOne({ where: { user_id: userId } });
}


}
