import { UpdateTaskDto } from "./dto/updateTask";
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { TaskAPIResponse } from "./dto/taskAPI.response";
import { CreateTaskDto } from "./dto/createTask";

@Controller("tasks")
export class TasksController {
  private logger = new Logger("TaskController");
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getTasks(): Promise<Task[]> {
    this.logger.log("Get tasks");
    return this.taskService.getTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") taskId: number): Promise<TaskAPIResponse> {
    this.logger.debug("Get task by id");
    return this.taskService.getTaskById(Number(taskId));
  }

  @Post()
  createTask(@Body() task: CreateTaskDto): Promise<TaskAPIResponse> {
    this.logger.debug("Creating task");
    return this.taskService.createTask(task);
  }

  @Put(":id")
  updateTask(
    @Body() task: UpdateTaskDto,
    @Param("id") taskId: number,
  ): Promise<TaskAPIResponse> {
    this.logger.debug("Updating task");
    return this.taskService.updateTask(task, Number(taskId));
  }

  @Patch(":id")
  toggleComplete(@Param("id") taskId: number): Promise<TaskAPIResponse> {
    this.logger.debug("Updating task complete status");

    return this.taskService.toggleComplete(Number(taskId));
  }

  @Delete(":id")
  deleteTask(@Param("id") taskId: number): Promise<TaskAPIResponse> {
    return this.taskService.deleteTask(Number(taskId));
  }
}
