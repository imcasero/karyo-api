import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({ example: 'user-id-uuid' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'user@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '2024-06-01T00:00:00.000Z' })
  @IsNotEmpty()
  createdAt: Date;
}
