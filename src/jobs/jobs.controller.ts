import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async listJobs(@Param('id') id: string) {
    return this.jobsService.listJobs(id);
  }
}
