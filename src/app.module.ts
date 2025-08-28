import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/db/prisma/prisma.module';
import { AuthModule } from './infra/auth/auth.module';
import { UserModule } from './user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
