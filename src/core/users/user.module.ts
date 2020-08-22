import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthsModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [
    AuthsModule,
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy]
})
export class UsersModule {}
