import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, Patch, Delete, ValidationPipe } from '@nestjs/common';
import { AuthService } from '@core/auth/auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';
import { ValidateUserDto } from '@core/users/dto/validate-user.dto';
import { AuthResponse } from '@src/common/interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createOne(@Body() dto: CreateUserDto): Promise<void> {
    await this.authService.createOne(dto);
  }

  @Post('/signin')
  validateUser(@Body() dto: ValidateUserDto): Promise<AuthResponse> {
    return this.authService.validateUser(dto);
  }
}
