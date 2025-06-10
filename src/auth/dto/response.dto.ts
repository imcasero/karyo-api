import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResponseDto {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  createdAt: Date;
}
