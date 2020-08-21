import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "@core/users/user.repository";
import { User } from "@core/users/user.entity";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { ValidateUserDto } from "../users/dto/validate-user.dto";
import { AuthResponse } from "@src/common/interface/auth.interface";
import { compareSync } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  createOne(dto: CreateUserDto): Promise<User> {
    return this.userRepository.create(dto).save();
  }

  async validateUser(dto: ValidateUserDto): Promise<AuthResponse> {
    const { username, password } = dto;

    const user: User = await this.userRepository.findOne({
      where: {
        username,
      }
    });
    if (!user || !compareSync(password, user.password)) {
      throw new BadRequestException(`${username} is not valid! Please check your username and password`);
    }

    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
      roleId: user.roleId,
    });

    const credentials: AuthResponse = {
      user,
      token,
    }

    return credentials;
  }
}