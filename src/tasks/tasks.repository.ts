import { UpdateTaskDto } from "./dto/updateTask";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/createTask";
import { Task } from "./task.entity";
import { User } from "src/user/user.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(task: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = task;

    const newTask = this.create({
      title,
      description,
      user,
    });

    const savedTask = await this.save(newTask);
    return savedTask;
  }

  async updateTask(task: UpdateTaskDto, taskId: number): Promise<Task> {
    const { title, description, isCompleted } = task;

    const oldTask = await this.findOne(taskId);

    oldTask.title = title;
    oldTask.description = description;
    oldTask.isCompleted = isCompleted;

    const savedTask = await this.save(oldTask);
    return savedTask;
  }
}
