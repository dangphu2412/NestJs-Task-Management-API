import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../../../common/enums/task-status.enum';

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    status: TaskStatus;
}
