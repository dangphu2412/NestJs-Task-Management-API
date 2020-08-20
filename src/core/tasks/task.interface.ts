import { TaskStatus } from "../../common/enums/task-status.enum";

export interface Task {
  id ?: number;

  title ?: string;

  content ?: string;

  status: TaskStatus;
}