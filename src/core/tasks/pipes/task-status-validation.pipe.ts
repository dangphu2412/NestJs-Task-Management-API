import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../../../common/enums/task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.IN_PROGRESS
    ]

    transform(status:any) {
        status = status.toUpperCase();
        if (!this.isStatusValid(status)) {
            throw new BadRequestException(`${status} is not acceptable`);
        }
        return status;
    }

    private isStatusValid(status:any) {
        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
}