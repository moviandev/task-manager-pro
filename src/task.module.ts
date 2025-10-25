import { Module } from '@nestjs/common';
import { CreateTaskUseCaseService } from './domains/use-cases/task/create-task.usecase.service';
import { TaskRepository } from './domains/interfaces/repositories/task.repository.interface';
import { TaskPrismaRepository } from './infra/db/prisma/repositories/task.repository.prisma';
import { UserRepository } from './domains/interfaces/repositories/user.repository.interface';
import { UserPrismaRepository } from './infra/db/prisma/repositories/user.repository.prisma';
import { PrismaModule } from './infra/db/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CreateTaskUseCaseService,
    {
      provide: TaskRepository,
      useClass: TaskPrismaRepository,
    },
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class TaskModule {}
