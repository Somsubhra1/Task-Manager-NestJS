import { AuthResponseBody } from "./dto/auth.response";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterRequestBody } from "./dto/registerAPI.request";
import { UserRepository } from "./user.repository";
import { JwtService } from "@nestjs/jwt";
import { LoginRequestBody } from "./dto/loginAPI.request";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(
    registerRequestBody: RegisterRequestBody,
  ): Promise<AuthResponseBody> {
    const { name, email, id, registerDate } =
      await this.userRepository.createUser(registerRequestBody);

    const payload = { email, id };

    const accessToken = this.jwtService.sign(payload);

    return {
      success: true,
      accessToken,
      user: { name, email, id, registerDate },
    };
  }
  async login(loginRequestBody: LoginRequestBody): Promise<AuthResponseBody> {
    const { email } = loginRequestBody;
    const { name, id, registerDate } = await this.userRepository.loginUser(
      loginRequestBody,
    );

    const payload = { email, id };
    const accessToken = this.jwtService.sign(payload);

    return {
      success: true,
      accessToken,
      user: { name, email, id, registerDate },
    };
  }
}
