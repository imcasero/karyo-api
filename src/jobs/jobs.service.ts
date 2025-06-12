import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
}
