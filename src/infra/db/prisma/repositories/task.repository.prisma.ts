import { Injectable } from '@nestjs/common';
import { TaskStatus } from '@prisma/client';
import { Task } from '../../../../domains/entities/task.entity';
import { TaskRepository } from '../../../../domains/interfaces/repositories/task.repository.interface';
import { PrismaService } from '../prisma.service';
import { TaskStatusType } from '../../../../domains/types/task-status.type';
import { User } from '../../../../domains/entities/user.entity';
import { RoleType } from '../../../../domains/types/role.type';

@Injectable()
export class TaskPrismaRepository implements TaskRepository{
  constructor(private prisma: PrismaService) { }

  async createTask(task: Task, userId?: string): Promise<Task> {
    try { 
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
    } catch (error) { 
      throw new Error('Could not create task', error);
    }
  }

  getTasksByUserId(userId: string): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }

  async getTaskById(taskId: string): Promise<Task | null> {
    try { 
      // TODO: Include project
      const task = await this.prisma.task.findUnique({
        where: { id: taskId },
        include: { assignee: true }
      });

      if (!task) return null;

      let user: User | undefined;
      if (task.assignee) {
        const role = task.assignee.role as RoleType;
        user = {
          id: task.assignee.id,
          name: task.assignee.name,
          email: { value: task.assignee.email },
          password: task.assignee.password,
          role: role,
          createdAt: task.assignee.createdAt,
          updatedAt: task.assignee.updatedAt,
        };
      }

      return new Task(
        task.id,
        task.title,
        task.status as TaskStatusType,
        undefined,
        user,
        task.createdAt,
        task.updatedAt,
      );
    } catch (error) {
      throw new Error('Could not get task by id', error);
    }
  }

  async updateTask(task: Task): Promise<Task | null> { 
    try {
      const statusValue = task.status as TaskStatus;

      const updatedTask = await this.prisma.task.update({
        where: { id: task.id },
        data: {
          title: task.title,
          status: statusValue,
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
    } catch (error) {
      throw new Error('Could not update task', error);
    }
  }

  async deleteTask(taskId: string): Promise<Task | null> {
    try {
      const task = await this.prisma.task.delete({
        where: { id: taskId }
      });

      return new Task(
        task.id,
        task.title,
        task.status as TaskStatusType,
        undefined,
        undefined,
        task.createdAt,
        task.updatedAt,
      );
    } catch (error) {
      throw new Error('Could not delete task', error);
    }
   }
}
