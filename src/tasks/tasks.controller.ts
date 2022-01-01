import { FilterTaskDto } from "./dto/filterTask";
import { AuthGuard } from "@nestjs/passport";
import { UpdateTaskDto } from "./dto/updateTask";
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
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
  getTasks(
    @Query() filterTask: FilterTaskDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.log("Get tasks");
    return this.taskService.getTasks(filterTask, user);
  }

  @Get(":id")
  getTaskById(
    @Param("id", ParseIntPipe) taskId: number,
    @GetUser() user: User,
  ): Promise<TaskAPIResponse> {
    this.logger.debug("Get task by id");
    return this.taskService.getTaskById(taskId, user);
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
    @Param("id", ParseIntPipe) taskId: number,
    @GetUser() user: User,
  ): Promise<TaskAPIResponse> {
    this.logger.debug("Updating task");
    return this.taskService.updateTask(task, taskId, user);
  }

  @Patch(":id")
  toggleComplete(
    @Param("id", ParseIntPipe) taskId: number,
    @GetUser() user: User,
  ): Promise<TaskAPIResponse> {
    this.logger.debug("Updating task complete status");

    return this.taskService.toggleComplete(taskId, user);
  }

  @Delete(":id")
  deleteTask(
    @Param("id", ParseIntPipe) taskId: number,
    @GetUser() user: User,
  ): Promise<TaskAPIResponse> {
    this.logger.debug("Deleting task");
    return this.taskService.deleteTask(taskId, user);
  }
}
