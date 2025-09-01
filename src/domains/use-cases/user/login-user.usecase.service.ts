import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserInput, LoginUserOutput } from '../../interfaces/models/user/login.user';
import { UserRepository } from '../../interfaces/repositories/user.repository.interface';
import { JwtService } from '../../../infra/auth/jwt/jwt.service';
import { PasswordHasherService } from '../../../shared/security/password-hasher.service';

@Injectable()
export class LoginUserUsecaseService {
  constructor(private passwordHashService: PasswordHasherService,
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }

  async execute(login: LoginUserInput): Promise<LoginUserOutput> {
    const { email, password } = login;
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await this.passwordHashService.compare(password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const token = await this.jwtService.sign({ userId: user.id, role: user.role });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email.value,
        role: user.role,
      }
    }
  }
}
