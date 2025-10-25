import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from 'src/domains/entities/task.entity';
import { TaskRepository } from '../../../../domains/interfaces/repositories/task.repository.interface';
import { PrismaService } from '../prisma.service';
import { TaskStatus } from '@prisma/client';
import { TaskStatusType } from 'src/domains/types/task-status.type';
import { User } from 'src/domains/entities/user.entity';
import { RoleType } from 'src/domains/types/role.type';

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

  async updateTask(taskId: string, title: string, status: TaskStatusType): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { assignee: true }
    });

    if (!task) throw new NotFoundException('Task not found');
    
    const statusValue = status as TaskStatus;

    task.title = title;
    task.status = statusValue;

    const updatedTask = await this.prisma.task.update({
      where: { id: taskId },
      data: {
        title: task.title,
        status: task.status,
      },
      include: { assignee: true }
    });

    let user: User | undefined;
    if (updatedTask.assignee) {
      const role = updatedTask.assignee.role as RoleType;
      user = {
        id: updatedTask.assignee.id,
        name: updatedTask.assignee.name,
        email: { value: updatedTask.assignee.email },
        password: updatedTask.assignee.password,
        role: role,
        createdAt: updatedTask.assignee.createdAt,
        updatedAt: updatedTask.assignee.updatedAt,
      };
    }

    return new Task(
      updatedTask.id,
      updatedTask.title,
      updatedTask.status as TaskStatusType,
      undefined,
      user,
      updatedTask.createdAt,
      updatedTask.updatedAt,
    );
  }

  deleteTask(taskId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
