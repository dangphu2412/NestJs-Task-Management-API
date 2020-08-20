import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, Patch, Delete, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('Users')
export class UserController {
  constructor(private userService: UserService) {}
}
