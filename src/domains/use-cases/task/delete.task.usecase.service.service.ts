import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../../interfaces/repositories/task.repository.interface';
import { DeleteTaskOutput } from '../../interfaces/models/task/delete.task.model';

@Injectable()
export class DeleteTaskUsecaseServiceService {
  constructor(private taskRepository: TaskRepository) { }
  
  async execute(taskId: string): Promise<DeleteTaskOutput> {
    try {
      const task = await this.taskRepository.getTaskById(taskId);
      if (!task) 
        throw new NotFoundException('Task not found');

      const deletedTask = await this.taskRepository.deleteTask(taskId);
      
      let success = false;
      if (deletedTask)
        success = true;

      return { success };
    } catch (error) {
      throw error;
    }
  }
}
