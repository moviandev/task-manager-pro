import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { AuthMiddleware } from './auth.middleware';

describe('AuthMiddleware', () => { 
  let middleware: AuthMiddleware;
  let jwtService: jest.Mocked<JwtService>;
  let mockReq: any;
  let mockRes: any;
  let next: jest.Mock;

  beforeEach(() => { 
    jwtService = {
      verify: jest.fn(),
      sign: jest.fn(),
    } as any;

    middleware = new AuthMiddleware(jwtService);
    mockReq = { headers: {} };
    mockRes = {};
    next = jest.fn();
  });

  it('should throw if no authorization header', async () => { 
    await expect(middleware.use(mockReq, mockRes, next)).rejects.toThrow(UnauthorizedException);
  });

  it('should throw if authorization header is not Bearer', async () => { 
    mockReq.headers['authorization'] = 'Basic token';
    await expect(middleware.use(mockReq, mockRes, next)).rejects.toThrow(UnauthorizedException);
  });

  it('should throw if token is invalid', async () => { 
    mockReq.headers['authorization'] = 'Bearer fake-token';
    jwtService.verify.mockRejectedValue(new Error('invalid'));

    await expect(middleware.use(mockReq, mockRes, next)).rejects.toThrow(UnauthorizedException);
  });

  it('should attach user and call next if token is valid', async () => {
    const payload = { userId: '123', role: 'user' };
    mockReq.headers['authorization'] = 'Bearer valid-token';
    jwtService.verify.mockResolvedValue(payload);

    await middleware.use(mockReq, mockRes, next);

    expect(mockReq.user).toEqual(payload);
    expect(next).toHaveBeenCalled();
  });
});