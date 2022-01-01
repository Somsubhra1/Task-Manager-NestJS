import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
} from "class-validator";
import { User } from "../user.entity";

export class AuthResponseBody {
  @IsBoolean()
  @IsNotEmpty()
  success: boolean;

  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsObject()
  @IsNotEmptyObject()
  user: User;
}
