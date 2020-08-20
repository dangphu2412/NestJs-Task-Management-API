import { Module } from '@nestjs/common';
import { TasksModule } from './core/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './core/users/user.module';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule {}
