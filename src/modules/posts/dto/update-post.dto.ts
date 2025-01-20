// dto/update-post.dto.ts
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({ description: 'Название поста', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Содержимое поста', required: false })
  @IsString()
  @IsOptional()
  content?: string;
}
