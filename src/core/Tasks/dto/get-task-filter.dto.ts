import { TaskStatus } from "@common/enums/task-status.enum";
import { FindConditions } from "typeorm";
import { Task } from "@src/core/Tasks/task.entity";

export class GetTaskFitlerDto {
    page : number;
    amount : number;
    filter : FindConditions<Task>;
}