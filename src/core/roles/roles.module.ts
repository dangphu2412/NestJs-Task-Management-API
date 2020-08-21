import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './roles.repository';
import { RoleController } from './roles.controller';
import { RoleService } from './roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleRepository])
  ],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RolesModule {}
