import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/db/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
