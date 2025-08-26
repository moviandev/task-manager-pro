import { User } from './user.entity';

export class Project {
  constructor(
    public readonly id: string,
    public name: string,
    public owner: User,
    public tasks: any[],
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
