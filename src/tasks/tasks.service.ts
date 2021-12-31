import { Task } from "./task.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [
    {
      title: "Test 1",
      description: "Desc 1",
      isCompleted: false,
      taskDate: new Date(),
      id: 1,
    },
    {
      title: "Test 2",
      description: "Desc 2",
      isCompleted: false,
      taskDate: new Date(),
      id: 1,
    },
  ];
  getTasks() {
    return this.tasks;
  }

  createTask(task: Task) {
    task.isCompleted = false;
    task.taskDate = new Date();
    task.id = this.tasks.length + 1;

    this.tasks.push(task);

    return task;
  }
}
