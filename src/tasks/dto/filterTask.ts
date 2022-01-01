import { IsOptional, IsString } from "class-validator";

export class FilterTaskDto {
  @IsOptional()
  @IsString()
  isCompleted: string;

  @IsOptional()
  @IsString()
  search: string;
}
