import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
} from "class-validator";

interface User {
  name: string;
  email: string;
  id: number;
  registerDate: Date;
}

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
