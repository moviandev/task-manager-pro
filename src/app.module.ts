import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/db/prisma/prisma.module';
import { UserModule } from './user.module';
import { TaskModule } from './task.module';

@Module({
  imports: [PrismaModule,
    UserModule,
    TaskModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
