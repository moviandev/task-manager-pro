import { Task } from 'src/domains/entities/task.entity';

export abstract class TaskRepository {
  abstract createTask(task: Task): Promise<Task>;
  abstract getTasksByUserId(userId: string): Promise<Task[]>;
  abstract getTaskById(taskId: string): Promise<Task | null>;
  abstract updateTask(task: Task): Promise<Task | null>;
  abstract deleteTask(taskId: string): Promise<void>;
}