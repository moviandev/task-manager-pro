import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtTokenPort } from '../../../application/ports/jwt-token.port';

@Injectable()
export class JwtService implements JwtTokenPort {
  constructor(private readonly jwtService: NestJwtService) {}

  async sign(payload: any, options?: object): Promise<string> {
    return await this.jwtService.signAsync(payload, options);
  }

  async verify(token: string, options?: object): Promise<any> {
    await this.jwtService.verifyAsync(token, options);
  }
}
