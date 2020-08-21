/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  BeforeInsert,
  JoinColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { hashSync } from "bcrypt";
import { Board } from "../boards/board.entity";
import { Task } from "../tasks/task.entity";
import { UserStatus } from "../../common/enums/user-status.enum";
import { enumToArray } from "../../utils/enumToArray";
import { Role } from "../roles/roles.entity";
import { BadRequestException } from "@nestjs/common";

@Entity()
export class User extends BaseEntity {

  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'admin@gmail.com' })
  @IsOptional()
  @IsString()
  @Column()
  username: string;

  @ApiProperty({ example: '123456' })
  @IsOptional()
  @IsString()
  @Column()
  password: string;

  @ApiProperty({ example: 'phu dep trai' })
  @IsOptional()
  @IsString()
  @Column()
  name: string;

  @ApiProperty({ example: 12 })
  @IsOptional()
  @IsInt()
  @Column()
  age: number;

  @ApiProperty({ example: UserStatus.ACTIVE })
  @IsOptional()
  @IsIn(enumToArray(UserStatus))
  @Column({
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  /**
   * Relations
   */

  @ApiProperty({ readOnly: true, writeOnly: true })
  @OneToMany(type => Board, board => board.author, { eager: false })
  boards: Board[]

  @ApiProperty({ readOnly: true })
  @OneToMany(type => Task, task => task.members)
  tasks: Task[]

  @ApiProperty({ readOnly: true })
  @ManyToOne(type => Role, role =>  role.users)
  @JoinColumn({ name: 'roleId' })
  role: Role

  @ApiProperty({ example: 2 })
  @IsInt()
  @IsOptional()
  @IsNotEmpty()
  @IsIn([2, 3])
  @Column({
    default: 3
  })
  roleId: number;
  /**
   * Trigger
   */
  @BeforeInsert()
  async isNew() {
    const builder = User.getRepository();
    const isExisted: User = await builder.findOne({
      where: {
        username: this.username,
      }
    });

    if (isExisted) {
      throw new BadRequestException(`${this.username} has already existed`);
    }
    this.password = hashSync(this.password, 10);
  }
}