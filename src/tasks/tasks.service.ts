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
      id: 2,
    },
  ];
  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(taskId: number): Task {
    return this.tasks.filter((task) => task.id === taskId)[0];
  }
  createTask(task: Task): Task {
    task.isCompleted = false;
    task.taskDate = new Date();
    task.id = this.tasks.length + 1;

    this.tasks.push(task);

    return task;
  }

  updateTask(task: Task, taskId: number): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    console.log(taskIndex);

    task.taskDate = this.tasks[taskIndex].taskDate;
    task.id = this.tasks[taskIndex].id;
    this.tasks[taskIndex] = task;

    return this.tasks[taskIndex];
  }
}
