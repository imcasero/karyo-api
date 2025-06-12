import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [AuthModule, JobsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
