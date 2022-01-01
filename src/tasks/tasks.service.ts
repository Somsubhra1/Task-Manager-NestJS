import { UpdateTaskDto } from "./dto/updateTask";
import { TaskAPIResponse } from "./dto/taskAPI.response";
import { Task } from "./task.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TasksRepository } from "./tasks.repository";
import { CreateTaskDto } from "./dto/createTask";
import { User } from "src/user/user.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private taskRepository: TasksRepository,
  ) {}

  getTasks(user: User): Promise<Task[]> {
    return this.taskRepository.find({ user });
  }

  async getTaskById(taskId: number, user: User): Promise<TaskAPIResponse> {
    const task = await this.taskRepository.findOne({ id: taskId, user });

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
  async createTask(task: CreateTaskDto, user: User): Promise<TaskAPIResponse> {
    const newTask = await this.taskRepository.createTask(task, user);

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
    user: User,
  ): Promise<TaskAPIResponse> {
    const { task: oldTask } = await this.getTaskById(taskId, user);

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

  async toggleComplete(taskId: number, user: User): Promise<TaskAPIResponse> {
    const { task } = await this.getTaskById(taskId, user);
    if (!task) {
      return {
        success: false,
        task: null,
        msg: `No task with id ${taskId} found!`,
      };
    }
    task.isCompleted = !task.isCompleted;

    const updateTaskRes = await this.updateTask(task, taskId, user);

    return {
      ...updateTaskRes,
      msg: `Task marked ${task.isCompleted ? "complete" : "incomplete"}`,
    };
  }

  async deleteTask(taskId: number, user: User): Promise<TaskAPIResponse> {
    const { task } = await this.getTaskById(taskId, user);
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
