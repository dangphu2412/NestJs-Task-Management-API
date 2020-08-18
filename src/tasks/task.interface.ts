import { TaskStatus } from "./task-status.enum";

export interface Task {
  id ?: number;

  title ?: string;

  content ?: string;

  status: TaskStatus;
}