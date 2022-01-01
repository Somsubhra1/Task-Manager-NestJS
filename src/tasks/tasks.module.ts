import { UserModule } from "./../user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { TasksRepository } from "./tasks.repository";

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository]), UserModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
