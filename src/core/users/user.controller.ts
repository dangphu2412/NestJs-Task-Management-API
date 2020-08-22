import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '@src/common/decorators/auth.decorator';
import { Roles } from '@src/common/enums/roles.enum';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Auth(Roles.ADMIN)
  @Get()
  getMany(@Request() req) {
    console.log(req.user)
    return this.userService.getMany();
  }
}
