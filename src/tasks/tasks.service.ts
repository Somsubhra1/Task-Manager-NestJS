import { TaskAPIResponse } from "./dto/taskAPI.response";
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

  getTaskById(taskId: number): TaskAPIResponse {
    const task = this.tasks.filter((task) => task.id === taskId)[0];

    if (!task) {
      return {
        success: false,
        task: null,
        msg: `No task with id ${taskId} found!`,
      };
    }
    return {
      success: true,
      task,
      msg: `Task fetched!`,
    };
  }
  createTask(task: Task): TaskAPIResponse {
    task.isCompleted = false;
    task.taskDate = new Date();
    task.id = this.tasks.length + 1;

    this.tasks.push(task);

    return {
      success: true,
      task,
      msg: `Task added!`,
    };
  }

  updateTask(task: Task, taskId: number): TaskAPIResponse {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      return {
        success: false,
        task: null,
        msg: `No task with id ${taskId} found!`,
      };
    }

    task.taskDate = this.tasks[taskIndex].taskDate;
    task.id = this.tasks[taskIndex].id;
    this.tasks[taskIndex] = task;

    return {
      success: true,
      task: this.tasks[taskIndex],
      msg: `Task updated!`,
    };
  }

  toggleComplete(taskId: number): TaskAPIResponse {
    const { task } = this.getTaskById(taskId);
    if (!task) {
      return {
        success: false,
        task: null,
        msg: `No task with id ${taskId} found!`,
      };
    }
    task.isCompleted = !task.isCompleted;

    return { ...this.updateTask(task, taskId), msg: "Task completed" };
  }

  deleteTask(taskId: number): TaskAPIResponse {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);

    const { task } = this.getTaskById(taskId);
    if (!task) {
      return {
        success: false,
        task: null,
        msg: `No task with id ${taskId} found!`,
      };
    }

    this.tasks.splice(taskIndex, 1);

    return { success: true, task, msg: "Task deleted" };
  }
}
