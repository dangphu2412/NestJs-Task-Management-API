import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsIn } from "class-validator";
import { User } from "../users/user.entity";
import { Roles } from "../../common/enums/roles.enum";

@Entity()
export class Role extends BaseEntity {

  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'CREATOR' })
  @IsString()
  @Column({
    default: Roles.MEMBER
  })
  name: string;

  /**
   * Relations
   */

  @ApiProperty({ readOnly: true })
  @OneToMany(type => User, user => user.role)
  users: User[]
}