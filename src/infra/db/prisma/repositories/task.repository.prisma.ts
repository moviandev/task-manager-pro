import { Injectable } from '@nestjs/common';
import { Task } from 'src/domains/entities/task.entity';
import { TaskRepository } from '../../../../domains/interfaces/repositories/task.repository.interface';
import { PrismaService } from '../prisma.service';
import { TaskStatus } from '@prisma/client';
import { TaskStatusType } from 'src/domains/types/task-status.type';

@Injectable()
export class TaskPrismaRepository implements TaskRepository{
  constructor(private prisma: PrismaService) { }

  async createTask(task: Task, userId?: string): Promise<Task> {
    // TODO: change the project thing
    const { title, status, project, createdAt } = task;

    const statusValue = status as TaskStatus;

    const createdTask = await this.prisma.task.create({
      data: {
        title,
        status: statusValue,
        project: { connect: { id: project?.id } },
        assignee: userId ? { connect: { id: userId } } : undefined,
        ...(createdAt ? { createdAt } : {}),
      }
    });

    return new Task(
      createdTask.id,
      createdTask.title,
      createdTask.status as TaskStatusType,
      project,
      task.assignee,
      createdTask.createdAt,
      createdTask.updatedAt,
    );
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
