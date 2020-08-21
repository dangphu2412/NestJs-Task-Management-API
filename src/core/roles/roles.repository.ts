import { Repository, EntityRepository } from "typeorm";
import { Role } from "./roles.entity";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
}