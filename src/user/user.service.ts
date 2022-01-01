import { AuthResponseBody } from "./dto/auth.response";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterRequestBody } from "./dto/registerAPI.request";
import { UserRepository } from "./user.repository";
import { JwtService } from "@nestjs/jwt";

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
}
