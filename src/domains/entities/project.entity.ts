import { User } from './user.entity';

export class Project {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly owner: User,
    public readonly tasks: any[],
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
