import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
<<<<<<< HEAD
          secret: 'test-secret',
=======
          secret: 'test-secret', // pode ser qualquer string para teste
>>>>>>> 8898ebbc747e3efa7e4548a415cecc6e28ae1915
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [JwtService],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sign and verify a token', async () => {
    const token = await service.sign({ userId: '123' });
    expect(token).toBeDefined();

    const payload = await service.verify(token);
    expect(payload).toHaveProperty('userId', '123');
  });
});