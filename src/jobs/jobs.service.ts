import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

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

  async updateJob(jobId: string, userId: string, data: UpdateJobDto) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job || job.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to access this job.',
      );
    }

    return this.prisma.job.update({
      where: { id: jobId },
      data,
    });
  }
}
