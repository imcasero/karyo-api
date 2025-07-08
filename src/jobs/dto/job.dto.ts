import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({ example: 'Acme Corp' })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({ example: 'Frontend Developer' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'https://acme.com/jobs/123' })
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @ApiProperty({ example: '2024-06-01T00:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  applicationDate: string;

  @ApiProperty({ example: 'applied' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiPropertyOptional({ example: 'Contacted by recruiter' })
  @IsString()
  @IsOptional()
  notes?: string;
}
