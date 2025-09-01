import { Email } from './email.vo';

describe('Email Value Object', () => { 
  it('should throw an error for invalid email', () => {
    expect(() => Email.create('invalid-email')).toThrow('Invalid email format');
  });

  it('should create an Email instance for valid email', () => { 
    const email = Email.create('testing@testing.com');
    expect(email).toBeInstanceOf(Email);
    expect(email.value).toBe('testing@testing.com');
  });
})