import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ITokenPayload } from '../interface/token.interface';
import { Role } from '@src/core/roles/roles.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: ITokenPayload = request.user;
    console.log(user);
    return this.matchRoles(roles, user.role);
  }

  matchRoles(roles: string[], role: Role): boolean {
    const { name } = role;
    return roles.includes(name);
  }
}