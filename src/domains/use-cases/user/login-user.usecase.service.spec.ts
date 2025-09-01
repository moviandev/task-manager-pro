import { LoginUserUseCaseService } from './login-user.usecase.service';
import { UserRepository } from '../../interfaces/repositories/user.repository.interface';
import { JwtService } from '../../../infra/auth/jwt/jwt.service';
import { PasswordHasherService } from '../../../shared/security/password-hasher.service';
import { Email } from '../../valueObjects/email.vo';

describe('LoginUserUseCaseService', () => {
  let useCase: LoginUserUseCaseService;
  let userRepository: jest.Mocked<UserRepository>;
  let passwordHasher: jest.Mocked<PasswordHasherService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    userRepository = {
      createUser: jest.fn(),
      findByEmail: jest.fn(),
    } as any;

    passwordHasher = {
      compare: jest.fn().mockResolvedValue(false),
    } as any;

    jwtService = {
      sign: jest.fn().mockResolvedValue('fake-jwt-token'),
      verify: jest.fn(),
    } as any;

    useCase = new LoginUserUseCaseService(passwordHasher, userRepository, jwtService);
  });

  it('should throw an unauthorized exception in case the user doesnt exists', async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    await expect(
      useCase.execute({ email: 'janedoe@example.com', password: '123456' })
    ).rejects.toThrow('Invalid credentials');
  });

  it('should throw an unauthorized exception in case the password is invalid', async () => {
    userRepository.findByEmail.mockResolvedValue({
      id: '123',
      name: 'John Doe',
      email: Email.create('john@example.com'),
      password: 'hashed-password',
      role: 'user',
    });

    await expect(
      useCase.execute({ email: 'janedoe@example.com', password: '123456' })
    ).rejects.toThrow('Invalid credentials');
  });

  it('should return user in case everything is correct', async () => { 
    userRepository.findByEmail.mockResolvedValue({
      id: '123',
      name: 'John Doe',
      email: Email.create('john@example.com'),
      password: 'hashed-password',
      role: 'user',
    });

    passwordHasher.compare.mockResolvedValue(true);
    const result = await useCase.execute({ email: 'john@example.com', password: 'hashed-password' });

    expect(result).toStrictEqual({
      token: 'fake-jwt-token',
      user: {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
      }
    });

  });
});
