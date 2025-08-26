import { Email } from '../valueObjects/email.vo';
import { Role } from '../types/role.type';

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: Email,
    public readonly password: string,
    public readonly role: Role,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
