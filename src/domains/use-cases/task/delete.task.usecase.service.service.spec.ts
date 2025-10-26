import { DeleteTaskUsecaseServiceService } from './delete.task.usecase.service.service';
import { TaskRepository } from '../../interfaces/repositories/task.repository.interface';

describe('DeleteTaskUsecaseServiceService', () => {
  let usecase: DeleteTaskUsecaseServiceService;
  let taskRepository: jest.Mocked<TaskRepository>;
  
  beforeEach(async () => {
    taskRepository = {
      getTaskById: jest.fn(),
      deleteTask: jest.fn()
    } as any;

    usecase = new DeleteTaskUsecaseServiceService(taskRepository);
  });

  it('should throw an error because task not found', async () => { 
    taskRepository.getTaskById.mockResolvedValue(null);

    await expect(usecase.execute('task-id'))
      .rejects.toThrow('Task not found');
  });

  it('should return false when the task is not deleted', async () => {
    taskRepository.getTaskById.mockResolvedValue({
      id: 'task-id',
      title: 'Task Title',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    taskRepository.deleteTask.mockResolvedValue(null);
    const result = await usecase.execute('task-id');

    expect(result).toEqual({ success: false });
  });

  it('should delete the task successfully', async () => { 
    taskRepository.getTaskById.mockResolvedValue({
      id: 'task-id',
      title: 'Task Title',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    taskRepository.deleteTask.mockResolvedValue({
      id: 'task-id',
      title: 'Task Title',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await usecase.execute('task-id');

    expect(result).toEqual({ success: true });
  });
});
