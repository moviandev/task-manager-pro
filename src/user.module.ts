import { Module } from '@nestjs/common';
import { UserPrismaRepository } from './infra/db/prisma/repositories/user.repository.prisma';
import { PrismaModule } from './infra/db/prisma/prisma.module';
import { PasswordHasherService } from './shared/security/password-hasher.service';
import { UserRepository } from './domains/interfaces/repositories/user.repository.interface';
import { RegisterUserUseCaseService } from './domains/use-cases/user/register-user.usecase.service';
import { LoginUserUseCaseService } from './domains/use-cases/user/login-user.usecase.service';
import { AuthModule } from './infra/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
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
