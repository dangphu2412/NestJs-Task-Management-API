import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@config/typeorm.config';
import { UserModule } from '@core/Users/user.module';
import { BoardModule } from '@core/Boards/board.module';
import { TasksModule } from '@core/Tasks/task.module';

@Module({
  imports: [
    TasksModule,
    UserModule,
    BoardModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule {}
