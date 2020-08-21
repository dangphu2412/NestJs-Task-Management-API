import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "@core/users/user.repository";
import { User } from "@core/users/user.entity";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository
  ) {}

  createOne(dto: CreateUserDto): Promise<User> {
    return this.userRepository.create(dto).save();
  }
}