import { Body, Controller, Get, Logger, Param, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";

@Controller("tasks")
export class TasksController {
  private logger = new Logger("TaskController");
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getTasks(): Task[] {
    this.logger.log("Get tasks");
    return this.taskService.getTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") taskId: number): Task {
    return this.taskService.getTaskById(Number(taskId));
  }
  @Post()
  createTask(@Body() task: Task): Task {
    this.logger.debug("Creating task");
    return this.taskService.createTask(task);
  }
}
