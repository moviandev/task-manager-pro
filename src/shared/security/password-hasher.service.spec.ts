import { PasswordHasherService } from './password-hasher.service';

describe('PasswordHasherService', () => {
  let service: PasswordHasherService;

  beforeEach(() => {
    service = new PasswordHasherService();
  });

  it('should hash any given string', async () => {
    const plainText = 'testingString';
    const hashed = await service.hash(plainText);

    expect(typeof hashed).toBe('string');
    expect(hashed).not.toBe(plainText);

    const hashed2 = await service.hash(plainText);
    expect(hashed).not.toEqual(hashed2);

    // validation should pass
    const isValid = await service.compare(plainText, hashed);
    expect(isValid).toBe(true);
  });

  it('should return false for the incorrect password', async () => {
    const plainText = 'testingString';

    const hashed = await service.hash(plainText);

    const isValid = await service.compare('wrongPassword', hashed);
    expect(isValid).toBe(false);
  });
});