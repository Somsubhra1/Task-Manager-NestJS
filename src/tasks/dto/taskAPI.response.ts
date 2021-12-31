import { Task } from "../task.entity";
import { IsBoolean, IsNotEmpty, IsObject, IsString } from "class-validator";

export class TaskAPIResponse {
  @IsBoolean()
  @IsNotEmpty()
  success: boolean;

  @IsString()
  @IsNotEmpty()
  msg: string;

  @IsObject()
  task: Task;
}
