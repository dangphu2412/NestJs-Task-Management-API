import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, Patch, Delete } from '@nestjs/common';
import { Task } from './task.interface';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from '../../common/enums/task-status.enum';
import { GetTaskFitlerDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  findAll(@Query() filter: GetTaskFitlerDto) {
    return this.taskService.findAll(filter);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto):Promise<Task> {
    return this.taskService.createOne(createTaskDto);
  }

  @Patch("/:id")
  patchTask(
    @Param("id", new ParseIntPipe()) id: number,
    @Query("status", new TaskStatusValidationPipe) status: TaskStatus
    ): Promise<void> {
    return this.taskService.patchTask(id, status);
  }

  @Delete()
  deleteTask(
    @Param("id", new ParseIntPipe()) id: number,
    ): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
