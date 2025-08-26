import { TaskStatus } from '../types/task-status.type';
import { Project } from './project.entity';
import { User } from './user.entity';

export class Task {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly status: TaskStatus,
    public readonly project: Project,
    public readonly assignee?: User,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
