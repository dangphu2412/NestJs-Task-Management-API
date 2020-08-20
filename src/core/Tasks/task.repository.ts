import { Repository, EntityRepository } from "typeorm";
import { Task } from "@src/core/Tasks/task.entity";
import { CreateTaskDto } from "@core/tasks/dto/create-task.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { content, title, status } = createTaskDto;

    const task = new Task();
    task.content = content;
    task.title = title;
    task.status = status;
    await task.save();

    return task;
  }
}