import { Module } from '@nestjs/common';
import { UserPrismaRepository } from './infra/db/prisma/repositories/user.repository.prisma';
import { PrismaModule } from './infra/db/prisma/prisma.module';
import { JwtModule } from './infra/auth/jwt/jwt.module';
import { PasswordHasherService } from './shared/security/password-hasher.service';
import { UserRepository } from './domains/interfaces/repositories/user.repository.interface';
import { RegisterUserUseCaseService } from './domains/use-cases/user/register-user.usecase.service';
import { LoginUserUseCaseService } from './domains/use-cases/user/login-user.usecase.service';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [
    PasswordHasherService,
    {
    provide: UserRepository,
    useClass: UserPrismaRepository,
    },
    RegisterUserUseCaseService,
    LoginUserUseCaseService
  ],
})
export class UserModule {}
