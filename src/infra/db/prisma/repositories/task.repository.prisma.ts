import { Task } from 'src/domains/entities/task.entity';
import { TaskRepository } from '../../../../domains/interfaces/repositories/task.repository.interface';
import { PrismaService } from '../prisma.service';

export class TaskPrismaRepository implements TaskRepository{
  constructor(private prisma: PrismaService) { }

  createTask(task: Task): Promise<Task> {
    throw new Error('Method not implemented.');
  }

  getTasksByUserId(userId: string): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }

  getTaskById(taskId: string): Promise<Task | null> {
    throw new Error('Method not implemented.');
  }

  updateTask(taskId: string, title: string, description: string): Promise<Task> {
    throw new Error('Method not implemented.');
  }

  deleteTask(taskId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
