import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, BeforeInsert} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsIn } from "class-validator";
import { hashSync } from "bcrypt";
import { Board } from "../boards/board.entity";
import { Task } from "../tasks/task.entity";
import { UserStatus } from "@src/common/enums/user-status.enum";
import { enumToArray } from "@src/utils/enumToArray";
import { Role } from "../roles/roles.entity";
import { BadRequestException } from "@nestjs/common";

@Entity()
export class User extends BaseEntity {

  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString()
  @Column()
  username: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @Column()
  password: string;

  @ApiProperty({ example: 'phu dep trai' })
  @IsString()
  @Column()
  name: string;

  @ApiProperty({ example: 12 })
  @IsInt()
  @Column()
  age: number;

  @ApiProperty({ example: UserStatus.ACTIVE })
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
  role: Role

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