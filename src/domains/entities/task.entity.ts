import { TaskStatus } from '../types/task-status.type';
import { Project } from './project.entity';
import { User } from './user.entity';

export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public status: TaskStatus,
    public project: Project,
    public assignee?: User,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  public changeStatus(newStatus: TaskStatus): void {
    this.status = newStatus;
  }
}
