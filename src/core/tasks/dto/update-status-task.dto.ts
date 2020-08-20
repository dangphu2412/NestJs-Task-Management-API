import { TaskStatus } from "../../../common/enums/task-status.enum";

export class UpdateStatusDto {
    id: number;
    status: TaskStatus;
}