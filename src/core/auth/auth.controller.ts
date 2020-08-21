import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, Patch, Delete, ValidationPipe } from '@nestjs/common';
import { AuthService } from '@core/auth/auth.service';

@Controller('Users')
export class AuthController {
  constructor(private authService: AuthService) {}
}
