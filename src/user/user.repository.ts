import { EntityRepository, Repository } from "typeorm";
import { RegisterRequestBody } from "./dto/registerAPI.request";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { LoginRequestBody } from "./dto/loginAPI.request";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(registerRequestBody: RegisterRequestBody): Promise<User> {
    const { name, email, password } = registerRequestBody;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ name, email, password: hashedPassword });

    try {
      return await this.save(user);
    } catch (error) {
      console.log(error);

      if (error.code === "23505") {
        // duplicate email
        throw new ConflictException("Email already exists");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async loginUser(loginRequestBody: LoginRequestBody) {
    const { email, password } = loginRequestBody;
    const user = await this.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      if (!user.isActive) {
        throw new ForbiddenException("User is deactivated");
      }
      return user;
    } else {
      throw new UnauthorizedException("Email or password incorrect");
    }
  }
}
