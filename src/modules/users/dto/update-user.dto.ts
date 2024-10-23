import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { IsUrl } from 'class-validator'
import { UserRankEnum } from '../entities/user-rank.enum'

@Exclude()
export class UpdateUserDto {

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

}
