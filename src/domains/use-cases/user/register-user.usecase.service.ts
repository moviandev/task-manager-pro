import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { UserRepository } from '../../interfaces/repositories/user.repository.interface';
import { Email } from '../../valueObjects/email.vo';
import { JwtService } from '../../../infra/auth/jwt/jwt.service';
import { PasswordHasherService } from '../../../shared/security/password-hasher.service';
import { RegisterUserInput, RegisterUserOutput } from '../../interfaces/models/user/register.user.model';

@Injectable()
export class RegisterUserUseCaseService {
  constructor(private passwordHashService: PasswordHasherService,
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }

  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const email = Email.create(input.email);

    const existingUser = await this.userRepository.findByEmail(email.value);

    if (existingUser) throw new Error('Email already in use');

    const hashedPassword = await this.passwordHashService.hash(input.password);

    const newUser = new User('', input.name, email, hashedPassword, input.role);

    const createdUser = await this.userRepository.createUser(newUser);
    const token = await this.jwtService.sign({ userId: createdUser.id, role: createdUser.role });
    return {
      token,
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email.value,
        role: createdUser.role,
      },
    }
  }
}
