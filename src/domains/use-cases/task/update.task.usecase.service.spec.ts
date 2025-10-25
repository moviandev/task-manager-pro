import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTaskUsecaseService } from './update.task.usecase.service';
import { TaskRepository } from '../../interfaces/repositories/task.repository.interface';
import { User } from '../../entities/user.entity';

describe('UpdateTaskUsecaseService', () => {
  let useCase: UpdateTaskUsecaseService;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    taskRepository = {
      updateTask: jest.fn(),
      getTaskById: jest.fn()
    } as any;

    useCase = new UpdateTaskUsecaseService(taskRepository);
  });

  it('should throw an error because task not found', async () => { 
    taskRepository.getTaskById = jest.fn().mockResolvedValue(null);

    await expect(useCase.execute('task-id', 'New Title', 'created'))
      .rejects.toThrow('Task not found');
  });

  it('should throw an error because could not update task', async () => { 
    const user: User = {
      id: '123',
      name: 'John Doe',
      email: { value: 'test@test.com' },
      password: 'hashed-password',
      role: 'user',
    };

    taskRepository.getTaskById = jest.fn().mockResolvedValue({
      id: 'task-id',
      title: 'Old Title',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      assignee: user,
    });
    
    taskRepository.updateTask = jest.fn().mockResolvedValue(null);

    await expect(useCase.execute('task-id', 'New Title', 'created'))
      .rejects.toThrow('Could not update task');
  });

  it('should update the task successfully with undefined date', async () => { 
    const user: User = {
      id: '123',
      name: 'John Doe',
      email: { value: 'test@test.com' },
      password: 'hashed-password',
      role: 'user',
    };

    taskRepository.getTaskById = jest.fn().mockResolvedValue({
      id: 'task-id',
      title: 'Old Title',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      assignee: user,
    });
    
    taskRepository.updateTask = jest.fn().mockResolvedValue({
      id: 'task-id',
      title: 'New Title',
      status: 'done',
      createdAt: new Date(),
      updatedAt: undefined,
      assignee: user,
    });

    const result = await useCase.execute('task-id', 'New Title', 'done');

    expect(result).toStrictEqual({
      id: 'task-id',
      title: 'New Title',
      status: 'done',
      UpdatedAt: expect.any(Date),
    });
  });

  it('should update the task successfully', async () => { 
        const user: User = {
      id: '123',
      name: 'John Doe',
      email: { value: 'test@test.com' },
      password: 'hashed-password',
      role: 'user',
    };

    taskRepository.getTaskById = jest.fn().mockResolvedValue({
      id: 'task-id',
      title: 'Old Title',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      assignee: user,
    });
    
    taskRepository.updateTask = jest.fn().mockResolvedValue({
      id: 'task-id',
      title: 'New Title',
      status: 'done',
      createdAt: new Date(),
      updatedAt: new Date(),
      assignee: user,
    });

    const result = await useCase.execute('task-id', 'New Title', 'done');

    expect(result).toStrictEqual({
      id: 'task-id',
      title: 'New Title',
      status: 'done',
      UpdatedAt: expect.any(Date),
    });
  });
});
