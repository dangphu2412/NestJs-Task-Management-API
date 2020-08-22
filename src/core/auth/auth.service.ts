import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "@core/users/user.repository";
import { User } from "@core/users/user.entity";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { ValidateUserDto } from "../users/dto/validate-user.dto";
import { AuthResponse } from "@src/common/interface/auth.interface";
import { compareSync } from "bcrypt";
import { ITokenPayload } from "@src/common/interface/token.interface";

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
      },
      relations: ['role']
    });
    if (!user || !compareSync(password, user.password)) {
      throw new BadRequestException(`${username} is not valid! Please check your username and password`);
    }
    console.log(user)
    const payload: ITokenPayload = {
      userId: user.id,
      username: user.username,
      role: user.role
    }

    const token: string = this.jwtService.sign(payload);

    const credentials: AuthResponse = {
      user,
      token,
    }

    return credentials;
  }
}