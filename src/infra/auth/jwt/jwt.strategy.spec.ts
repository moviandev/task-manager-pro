import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(() => {
    strategy = new JwtStrategy();
  });

  it('should return user object from payload', async () => {
    const payload = { sub: '123', email: 'john@example.com', role: 'user' };

    const result = await strategy.validate(payload);

    expect(result).toEqual({
      userId: '123',
      email: 'john@example.com',
      role: 'user',
    });
  });

  it('should handle payloads missing optional fields', async () => {
    const payload = { sub: '123' };

    const result = await strategy.validate(payload);

    expect(result).toEqual({
      userId: '123',
      email: undefined,
      role: undefined,
    });
  });
});