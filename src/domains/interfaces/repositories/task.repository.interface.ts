import { Task } from 'src/domains/entities/task.entity';

export abstract class TaskRepository {
  abstract createTask(title: string, description: string, userId: string): Promise<Task>;
  abstract getTasksByUserId(userId: string): Promise<Task[]>;
  abstract getTaskById(taskId: string): Promise<Task | null>;
  abstract updateTask(taskId: string, title: string, description: string): Promise<Task>;
  abstract deleteTask(taskId: string): Promise<void>;
}