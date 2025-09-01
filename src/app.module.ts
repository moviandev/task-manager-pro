import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PrismaModule } from './infra/db/prisma/prisma.module';
import { UserModule } from './user.module';
import { AuthMiddleware } from './infra/auth/middlewares/auth.middleware';
import { JwtModule } from './infra/auth/jwt/jwt.module';

@Module({
  imports: [PrismaModule,
    UserModule,
    JwtModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) { 
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*'); 
  }
}
