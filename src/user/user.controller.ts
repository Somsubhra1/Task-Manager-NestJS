import { User } from "./user.entity";
import { LoginRequestBody } from "./dto/loginAPI.request";
import { RegisterRequestBody } from "./dto/registerAPI.request";
import { UserService } from "./user.service";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthResponseBody } from "./dto/auth.response";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "./get-user.decorator";

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

  @Get()
  @UseGuards(AuthGuard())
  getUser(@GetUser() user: User) {
    const { name, email, id, isActive, registerDate } = user;
    return { name, email, id, isActive, registerDate };
  }
}
