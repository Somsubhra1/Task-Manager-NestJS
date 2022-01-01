import { JwtPayload } from "./jwt-payload.interface";
import { UserRepository } from "./user.repository";
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { configService } from "src/config/config.service";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: configService.getJwtConfig().secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    const user: User = await this.userRepository.findOne(id);

    if (!user) {
      throw new UnauthorizedException();
    } else if (!user.isActive) {
      throw new ForbiddenException("User is deactivated");
    }
    return user;
  }
}
