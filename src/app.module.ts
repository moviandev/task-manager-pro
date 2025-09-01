import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/db/prisma/prisma.module';
import { UserModule } from './user.module';

@Module({
  imports: [PrismaModule,
    UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
