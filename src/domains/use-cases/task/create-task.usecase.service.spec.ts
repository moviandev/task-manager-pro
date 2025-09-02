import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskUseCaseService } from './create-task.usecase.service';

describe('CreateTaskUseCaseService', () => {
  let service: CreateTaskUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTaskUseCaseService],
    }).compile();

    service = module.get<CreateTaskUseCaseService>(CreateTaskUseCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
