import { Body, Controller, Get, Logger, Param, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";

@Controller("tasks")
export class TasksController {
  private logger = new Logger("TaskController");
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getTasks() {
    this.logger.log("Get tasks");
    return this.taskService.getTasks();
  }

  @Post()
  createTask(@Body() task: Task) {
    this.logger.debug("Creating task");
    return this.taskService.createTask(task);
  }
}
