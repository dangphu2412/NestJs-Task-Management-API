import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";

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

  /**
   * Relations
   */

  // @ApiProperty({ readOnly: true, writeOnly: true })
  // @OneToMany(type => Board, board => board.author, { eager: false })
  // boards: Board[]

  // @ApiProperty({ readOnly: true })
  // @OneToMany(type => Task, task => task.members)
  // tasks: Task[]
}