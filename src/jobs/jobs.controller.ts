import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateJobDto } from './dto/job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@ApiTags('jobs')
@ApiBearerAuth()
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @ApiOperation({ summary: 'List jobs for a user' })
  @ApiResponse({ status: 200, description: 'List of jobs returned.' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async listJobs(@Param('id') id: string) {
    return this.jobsService.listJobs(id);
  }

  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({ status: 201, description: 'Job created.' })
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createJob(@Body() Job: CreateJobDto, @Req() req) {
    const userId: string = req.user.id;
    return this.jobsService.createJob(Job, userId);
  }

  @ApiOperation({ summary: 'Delete a job' })
  @ApiResponse({ status: 200, description: 'Job deleted.' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteJob(@Param('id') id: string) {
    return this.jobsService.deleteJob(id);
  }

  @ApiOperation({ summary: 'Update a job' })
  @ApiResponse({ status: 200, description: 'Job updated.' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateJob(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.jobsService.updateJob(id, userId, updateJobDto);
  }
}
