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
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateJobDto } from './dto/job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

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
