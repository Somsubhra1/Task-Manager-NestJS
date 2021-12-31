import { UpdateTaskDto } from "./dto/updateTask";
import { TaskAPIResponse } from "./dto/taskAPI.response";
import { Task } from "./task.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TasksRepository } from "./tasks.repository";
import { CreateTaskDto } from "./dto/createTask";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private taskRepository: TasksRepository,
  ) {}

  getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTaskById(taskId: number): Promise<TaskAPIResponse> {
    const task = await this.taskRepository.findOne(taskId);

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
  async createTask(task: CreateTaskDto): Promise<TaskAPIResponse> {
    const newTask = await this.taskRepository.createTask(task);

    if (!newTask) {
      return {
        success: false,
        task: null,
        msg: `Couldn't add Task!`,
      };
    }
    return {
      success: true,
      task: newTask,
      msg: `Task added!`,
    };
  }

  async updateTask(
    task: UpdateTaskDto,
    taskId: number,
  ): Promise<TaskAPIResponse> {
    const { task: oldTask } = await this.getTaskById(taskId);

    if (!oldTask) {
      return {
        success: false,
        task: null,
        msg: `Couldn't find Task!`,
      };
    }

    const updatedTask = await this.taskRepository.updateTask(task, taskId);
    return {
      success: true,
      task: updatedTask,
      msg: `Task updated!`,
    };
  }

  async toggleComplete(taskId: number): Promise<TaskAPIResponse> {
    const { task } = await this.getTaskById(taskId);
    if (!task) {
      return {
        success: false,
        task: null,
        msg: `No task with id ${taskId} found!`,
      };
    }
    task.isCompleted = !task.isCompleted;

    const updateTaskRes = await this.updateTask(task, taskId);

    return {
      ...updateTaskRes,
      msg: `Task marked ${task.isCompleted ? "complete" : "incomplete"}`,
    };
  }

  async deleteTask(taskId: number): Promise<TaskAPIResponse> {
    const { task } = await this.getTaskById(taskId);
    if (!task) {
      return {
        success: false,
        task: null,
        msg: `No task with id ${taskId} found!`,
      };
    }

    await this.taskRepository.remove(task);

    return { success: true, task, msg: "Task deleted" };
  }
}
