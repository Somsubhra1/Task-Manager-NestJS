import { InternalServerErrorException } from "@nestjs/common";
import { UpdateTaskDto } from "./dto/updateTask";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/createTask";
import { Task } from "./task.entity";
import { User } from "src/user/user.entity";
import { FilterTaskDto } from "./dto/filterTask";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async findTasks(filterTask: FilterTaskDto, user: User): Promise<Task[]> {
    const { isCompleted, search } = filterTask;

    const query = this.createQueryBuilder("task");

    query.where({ user });

    if (typeof isCompleted !== "undefined") {
      query.andWhere("task.isCompleted = :isCompleted", { isCompleted });
    }
    if (search) {
      query.andWhere(
        "(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))",
        { search: `%${search}%` },
      );
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException("Internal server error");
    }
  }
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
