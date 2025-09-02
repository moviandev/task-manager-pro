import { Module } from '@nestjs/common';
import { CreateTaskUseCaseService } from './domains/use-cases/task/create-task.usecase.service';

@Module({
  providers: [CreateTaskUseCaseService],
})
export class TaskModule {}
