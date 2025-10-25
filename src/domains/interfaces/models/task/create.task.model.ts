import { TaskStatusType } from '../../../types/task-status.type';

export interface CreateTaskInput {
  title: string;
  projectId: string;
  userEmail: string;
}

export interface CreateTaskOutput {
  id: string;
  title: string;
  status: TaskStatusType;
  projectId?: string;
}