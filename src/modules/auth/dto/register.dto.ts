import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RegisterDto {
    @IsEmail()
    @ApiProperty(
        {
            description: "email"
        }
    )
    email: string


    @IsString()
    @MinLength(4)
    @ApiProperty(
        {
            description: "password"
        }
    )
    password: string

    @IsString()
    @MinLength(2)
    @ApiProperty(
        {
            description: "username"
        }
    )
    username: string;
}
