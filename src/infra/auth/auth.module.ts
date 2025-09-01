import { Module } from '@nestjs/common';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [JwtModule],
  exports: [JwtModule],
})
export class AuthModule {}