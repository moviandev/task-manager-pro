import { Task } from './task.entity';
import { User } from './user.entity';

export class Project {
  constructor(
    public readonly id: string,
    public name: string,
    public owner: User,
    public tasks: Task[],
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
