import { IsOptional, IsString, IsUrl, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateJobDto {
  @ApiPropertyOptional({ example: 'Acme Corp' })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiPropertyOptional({ example: 'Frontend Developer' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'https://acme.com/jobs/123' })
  @IsOptional()
  @IsUrl()
  link?: string;

  @ApiPropertyOptional({ example: '2024-06-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  applicationDate?: string;

  @ApiPropertyOptional({ example: 'applied' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: 'Contacted by recruiter' })
  @IsOptional()
  @IsString()
  notes?: string;
}
