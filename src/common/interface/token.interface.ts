import { Role } from "@src/core/roles/roles.entity";

export interface ITokenPayload {
  userId: number;
  username: string;
  role: Role;
}