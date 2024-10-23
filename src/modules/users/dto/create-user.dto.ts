import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsUrl } from 'class-validator'
import { UserRankEnum } from '../entities/user-rank.enum'

@Exclude()
export class CreateUserDto {

    @Expose()
    @ApiProperty(
        {
            description: "username",
            example: "Sknery"
        }
    )
    username: string

    @Expose()
    @ApiProperty(
        {
            description: "MC username",
            example: "Skn3ry"
        }
    )
    minecraft_username: string

    @Expose()
    @ApiProperty(
        {
            description: "first login date",
            example: "2024-10-10T00:00:00.000Z"
        }
    )
    first_login: Date

    @Expose()
    @ApiProperty(
        {
            description: "user description",
            example: "The description"
        }
    )
    description: string

    @Expose()
    @ApiProperty(
        {
            description: "Profile picture URL",
            example: "https://example.com/profile.jpg"
        }
    )
    @IsUrl({}, { message: 'Profile picture must be a valid URL' }) // Валидация URL
    pfp_url: string

    @Expose()
    @ApiProperty(
        {
            description: "MC skin URL",
            example: "https://example.com/profile.jpg"
        }
    )
    @IsUrl({}, { message: 'Skin must be a valid URL' }) // Валидация URL
    minecraft_skin_url: string

    @Expose()
    @ApiProperty(
        {
            description: "user password",
            example: "password"
        }
    )
    password: string
}
