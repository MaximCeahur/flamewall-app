import { ApiProperty } from '@nestjs/swagger';

export class RespondFriendRequestDto {
  @ApiProperty({
    description: 'ID запроса на дружбу',
    example: 1, // Пример ID запроса на дружбу
  })
  requestId: number;

  @ApiProperty({
    description: 'Флаг принятия или отклонения запроса',
    example: true, // Пример значения для принятия запроса
  })
  accept: boolean;
}
