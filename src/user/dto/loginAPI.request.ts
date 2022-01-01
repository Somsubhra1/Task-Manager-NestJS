import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginRequestBody {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
