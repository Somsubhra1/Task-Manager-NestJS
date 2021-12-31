import { UpdateTaskDto } from "./dto/updateTask";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/createTask";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(task: CreateTaskDto): Promise<Task> {
    const { title, description } = task;

    this.create({
      title,
      description,
    });

    const savedTask = await this.save(task);
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
