import { AuthGuard } from "@nestjs/passport";
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
  UseGuards,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { TaskAPIResponse } from "./dto/taskAPI.response";
import { CreateTaskDto } from "./dto/createTask";
import { GetUser } from "src/user/get-user.decorator";
import { User } from "src/user/user.entity";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger("TaskController");
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getTasks(@GetUser() user: User): Promise<Task[]> {
    this.logger.log("Get tasks");
    return this.taskService.getTasks(user);
  }

  @Get(":id")
  getTaskById(
    @Param("id") taskId: number,
    @GetUser() user: User,
  ): Promise<TaskAPIResponse> {
    this.logger.debug("Get task by id");
    return this.taskService.getTaskById(Number(taskId), user);
  }

  @Post()
  createTask(
    @Body() task: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<TaskAPIResponse> {
    this.logger.debug("Creating task");
    return this.taskService.createTask(task, user);
  }

  @Put(":id")
  updateTask(
    @Body() task: UpdateTaskDto,
    @Param("id") taskId: number,
    @GetUser() user: User,
  ): Promise<TaskAPIResponse> {
    this.logger.debug("Updating task");
    return this.taskService.updateTask(task, Number(taskId), user);
  }

  @Patch(":id")
  toggleComplete(
    @Param("id") taskId: number,
    @GetUser() user: User,
  ): Promise<TaskAPIResponse> {
    this.logger.debug("Updating task complete status");

    return this.taskService.toggleComplete(Number(taskId), user);
  }

  @Delete(":id")
  deleteTask(
    @Param("id") taskId: number,
    @GetUser() user,
  ): Promise<TaskAPIResponse> {
    return this.taskService.deleteTask(Number(taskId), user);
  }
}
