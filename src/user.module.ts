import { Module } from '@nestjs/common';
import { UserPrismaRepository } from './infra/db/prisma/repositories/user.repository.prisma';
import { PrismaModule } from './infra/db/prisma/prisma.module';
import { RegisterUserUseCaseService } from './domains/user-cases/user/register-user.usecase.service';
import { JwtModule } from './infra/auth/jwt/jwt.module';
import { PasswordHasherService } from './shared/security/password-hasher.service';
import { UserRepository } from './domains/interfaces/repositories/user.repository.interface';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [
    PasswordHasherService,
    {
    provide: UserRepository,
    useClass: UserPrismaRepository,
    },
    RegisterUserUseCaseService
  ],
})
export class UserModule {}
