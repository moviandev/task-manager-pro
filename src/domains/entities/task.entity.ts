import { TaskStatusType } from '../types/task-status.type';
import { Project } from './project.entity';
import { User } from './user.entity';

export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public status: TaskStatusType,
    public project?: Project,
    public assignee?: User,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  // private changeStatus(newStatus: TaskStatusType): void {
  //   this.status = newStatus;
  // }
}
