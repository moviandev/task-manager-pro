import { RegisterUserUseCaseService } from './register.user.usecase.service';
import { UserRepository } from 'src/domains/interfaces/repositories/user.repository.interface';
import { PasswordHasherService } from 'src/shared/security/password-hasher.service';
import { JwtService } from 'src/infra/auth/jwt/jwt.service';
import { Email } from '../../valueObjects/email.vo';

describe('RegisterUserUseCaseService', () => {
  let useCase: RegisterUserUseCaseService;
  let userRepository: jest.Mocked<UserRepository>;
  let passwordHasher: jest.Mocked<PasswordHasherService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    userRepository = {
      createUser: jest.fn(),
      findByEmail: jest.fn(),
    } as any;

    passwordHasher = {
      hash: jest.fn().mockResolvedValue('hashed-password'),
    } as any;

    jwtService = {
      sign: jest.fn().mockResolvedValue('fake-jwt-token'),
      verify: jest.fn(),
    } as any;

    useCase = new RegisterUserUseCaseService(passwordHasher, userRepository, jwtService);
  });

  it('should register a user and return JWT', async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    userRepository.createUser.mockResolvedValue({
      id: '123',
      name: 'John Doe',
      email: Email.create('john@example.com'),
      password: 'hashed-password',
      role: 'user',
    });

    const result = await useCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      role: 'user',
    });

    expect(passwordHasher.hash).toHaveBeenCalledWith('123456');
    expect(userRepository.createUser).toHaveBeenCalled();
    expect(jwtService.sign).toHaveBeenCalled();
    expect(result).toHaveProperty('token', 'fake-jwt-token');
    expect(result.user.email).toBe('john@example.com');
  });

  it('should throw an error if email already in use', async () => { 
    userRepository.findByEmail.mockResolvedValue({
      id: '123',
      name: 'John Doe',
      email: Email.create('john@example.com'),
      password: 'hashed-password',
      role: 'user',
    });

    await expect(
      useCase.execute({
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        role: 'user',
      }),
    ).rejects.toThrow('Email already in use');
  });
});