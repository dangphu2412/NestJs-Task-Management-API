import { Repository, EntityRepository } from "typeorm";
import { User } from "@src/core/Users/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {}