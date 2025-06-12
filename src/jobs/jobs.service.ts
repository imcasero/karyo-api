import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}
  async listJobs(id: string) {
    const userWithJobs = await this.prisma.user.findUnique({
      where: { id },
      include: {
        jobs: true,
      },
    });

    return userWithJobs?.jobs;
  }

  async createJob(jobData: CreateJobDto, userId: string) {
    return this.prisma.job.create({ data: { ...jobData, userId } });
  }

  async deleteJob(id: string) {
    return this.prisma.job.delete({ where: { id: id } });
  }
}
