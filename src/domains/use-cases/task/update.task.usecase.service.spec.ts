import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTaskUsecaseService } from './update.task.usecase.service';

describe('UpdateTaskUsecaseService', () => {
  let service: UpdateTaskUsecaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateTaskUsecaseService],
    }).compile();

    service = module.get<UpdateTaskUsecaseService>(UpdateTaskUsecaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
