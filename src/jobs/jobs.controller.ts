import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateJobDto } from './dto/job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async listJobs(@Param('id') id: string) {
    return this.jobsService.listJobs(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createJob(@Body() Job: CreateJobDto) {
    return this.jobsService.createJob(Job);
  }
}
