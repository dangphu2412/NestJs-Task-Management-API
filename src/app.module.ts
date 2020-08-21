import { Module } from '@nestjs/common';
import { TasksModule } from './core/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './core/users/user.module';
import { RolesModule } from './core/roles/roles.module';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    RolesModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule {}
