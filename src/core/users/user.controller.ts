import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, Patch, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getMany() {
    return this.userService.getMany();
  }
}
