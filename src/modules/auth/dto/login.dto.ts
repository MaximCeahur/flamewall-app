import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty(
      {
          description: "email",
          example: "email5@example.com"
      }
  )
  email: string


  @IsString()
  @MinLength(4)
  @ApiProperty(
      {
          description: "password",
          example: "securePassword123"
      }
  )
  password: string
}
