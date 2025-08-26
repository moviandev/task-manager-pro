import { Email } from '../valueObjects/email.vo';
import { Role } from '../types/role.type';

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: Email,
    public password: string,
    public role: Role,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
