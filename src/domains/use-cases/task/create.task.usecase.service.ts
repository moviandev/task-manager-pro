import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskInput, CreateTaskOutput } from '../../interfaces/models/task/create.task.model';
import { UserRepository } from '../../interfaces/repositories/user.repository.interface';
import { TaskRepository } from '../../interfaces/repositories/task.repository.interface';
import { Email } from '../../valueObjects/email.vo';
import { User } from '../../entities/user.entity';

@Injectable()
export class CreateTaskUseCaseService {
  constructor(private taskRepository: TaskRepository, private userRepository: UserRepository) { }

  async execute(task: CreateTaskInput): Promise<CreateTaskOutput> {
    if (!task.userEmail)
      throw new BadRequestException('Email is required');
    const userEmail = Email.create(task.userEmail);
    
    let user = await this.userRepository.findByEmail(userEmail.value);

    if (!user)
      throw new NotFoundException('User Not Found');

    var newTask = await this.taskRepository.createTask({
      id: '',
      title: task.title,
      status: 'created',
      project: undefined,
      assignee: user,
      createdAt: undefined,
      updatedAt: undefined
    });

    return {
      id: newTask.id,
      title: newTask.title,
      status: newTask.status,
      projectId: newTask.project?.id
    }
  }
}
