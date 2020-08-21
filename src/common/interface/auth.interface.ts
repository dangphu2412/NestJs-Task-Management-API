import { User } from "@src/core/users/user.entity";

export interface AuthResponse {
  user: User;
  token: string;
}