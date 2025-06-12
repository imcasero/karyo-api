import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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
  async createJob(@Body() Job: CreateJobDto, @Req() req) {
    const userId: string = req.user.id;
    return this.jobsService.createJob(Job, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteJob(@Param('id') id: string) {
    return this.jobsService.deleteJob(id);
  }
}
