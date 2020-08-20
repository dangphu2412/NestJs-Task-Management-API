import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskRepository } from "./task.repository";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { ObjectLiteral } from "typeorm";
import { TaskStatus } from "../../common/enums/task-status.enum";
import { GetTaskFitlerDto } from "./dto/get-task-filter.dto";
import { Filter } from "@src/common/enums/filter.enum";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TaskRepository
  ) {}

  findAll(filterDto: GetTaskFitlerDto): Promise<Task[]> {
    const { page = Filter.page, amount = Filter.amount, filter = TaskStatus.OPEN } = filterDto;

    return this.taskRepository.find({
      where: {
        status: filter,
      },
      take: amount,
      skip: (page - 1) * amount,
    })
  }

  findByPk(id: number): Promise<Task> {
    return this.taskRepository.findOne(id);
  }

  findOne(condition: ObjectLiteral): Promise<Task> {
    return this.taskRepository.findOne
    ({
        where: condition
    });
  }

  async createOne(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title } = createTaskDto;

    const condition: ObjectLiteral = {
      title,
    }
    const found = await this.findOne(condition);

    if (found) {
      throw new BadRequestException("This task has already existed");
    }

    return this.taskRepository.createTask(createTaskDto);
  }

  async patchTask(id: number, status: TaskStatus): Promise<void> {
    const task = await this.findByPk(id);

    if (!task) {
      throw new NotFoundException(`Not found task with id ${id}`);
    }

    task.status = status;
    await task.save();
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.findByPk(id);

    if (!task) {
      throw new NotFoundException(`Not found task with id ${id}`);
    }

    await task.remove();
  }
}