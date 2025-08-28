import { Email } from '../valueObjects/email.vo';
import { RoleType } from '../types/role.type';

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: Email,
    public password: string,
    public role: RoleType,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
