import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateTaskOutput } from '../../interfaces/models/task/update.task.model';
import { TaskRepository } from '../../interfaces/repositories/task.repository.interface';
import { TaskStatusType } from '../../types/task-status.type';

@Injectable()
export class UpdateTaskUsecaseService {
  constructor(private taskRepository: TaskRepository) { }

  async execute(taskId: string, title: string, status: TaskStatusType): Promise<UpdateTaskOutput> { 
    try {
      const task = await this.taskRepository.getTaskById(taskId);
      
      if (!task) throw new NotFoundException('Task not found');
      task.title = title;
      task.status = status;

      const updatedTask = await this.taskRepository.updateTask(task);

      if (!updatedTask) throw new InternalServerErrorException('Could not update task');

      return {
        id: updatedTask.id,
        title: updatedTask.title,
        status: updatedTask.status,
        UpdatedAt: updatedTask.updatedAt ?? new Date(),
      }
    } catch (error) {
      throw error;
    }
  }
}
