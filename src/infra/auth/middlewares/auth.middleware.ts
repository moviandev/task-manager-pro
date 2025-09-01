import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer '))
      throw new UnauthorizedException('Missing or invalid token');

    const token = authHeader.split(' ')[1];

    try {
      const payload = await this.jwtService.verify(token);
      (req as any).user = payload;
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}