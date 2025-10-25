import { CreateTaskUseCaseService } from './create.task.usecase.service';
import { UserRepository } from '../../interfaces/repositories/user.repository.interface';
import { TaskRepository } from '../../interfaces/repositories/task.repository.interface';
import { CreateTaskInput } from '../../interfaces/models/task/create.task.model';
import { User } from '../../entities/user.entity';

describe('CreateTaskUseCaseService', () => {
  let userCase: CreateTaskUseCaseService;
  let userRepository: jest.Mocked<UserRepository>;
  let taskRepository: jest.Mocked<TaskRepository>;
  let taskInput: CreateTaskInput;

  beforeEach(async () => {
    taskInput = {
      title: 'task test',
      projectId: '',
      userEmail: ''
    }

    userRepository = {
      createUser: jest.fn(),
      findByEmail: jest.fn()
    } as any;

    taskRepository = {
      createTask: jest.fn()
    } as any;

    userCase = new CreateTaskUseCaseService(taskRepository, userRepository);
  });

  it('should throw an error because email is wrong', async () => {
    await expect(userCase.execute(taskInput))
      .rejects.toThrow('Email is required');
  });

  it('should throw an error because user not found', async () => { 
    taskInput.userEmail = 'test@test.com';
    userRepository.findByEmail.mockResolvedValue(null);

    await expect(userCase.execute(taskInput))
      .rejects.toThrow('User Not Found');
  });

  it('should create a new task', async () => { 
    taskInput = {
      title: 'task test',
      projectId: '',
      userEmail: 'test@test.com'
    };

    const user: User = {      
      id: '123',
      name: 'John Doe',
      email: { value: 'test@test.com' },
      password: 'hashed-password',
      role: 'user',
    }

    userRepository.findByEmail.mockResolvedValue(user);

    taskRepository.createTask.mockResolvedValue({
      id: 'task-123',
      title: 'task test',
      status: 'created',
      project: undefined,
      assignee: user,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const createdTask = await userCase.execute(taskInput);

    expect(createdTask).toBeDefined();
    expect(createdTask.title).toBe('task test');
    expect(createdTask.status).toBe('created');
  });
});
