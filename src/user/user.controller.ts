import { LoginRequestBody } from "./dto/loginAPI.request";
import { RegisterRequestBody } from "./dto/registerAPI.request";
import { UserService } from "./user.service";
import { Body, Controller, Post } from "@nestjs/common";
import { AuthResponseBody } from "./dto/auth.response";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  async register(
    @Body() registerRequestBody: RegisterRequestBody,
  ): Promise<AuthResponseBody> {
    return this.userService.register(registerRequestBody);
  }

  @Post("login")
  async login(
    @Body() loginRequestBody: LoginRequestBody,
  ): Promise<AuthResponseBody> {
    return this.userService.login(loginRequestBody);
  }
}
