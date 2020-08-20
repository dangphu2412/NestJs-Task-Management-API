import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { TaskStatus } from "../../common/enums/task-status.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString } from "class-validator";
import { enumToArray } from "@src/utils/enumToArray";

@Entity()
export class Task extends BaseEntity {
    @ApiProperty({ readOnly: true })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'This is title' })
    @IsString()
    @Column()
    title: string;

    @ApiProperty({ example: 'This is content' })
    @IsString()
    @Column("text")
    content: string;

    @ApiProperty({ example: 'OPEN' })
    @IsIn(enumToArray(TaskStatus))
    @Column({
        default: TaskStatus.OPEN
    })
    status: TaskStatus;

    // @ManyToOne(type => Board, board => board.tasks, { eager: true })
    // @JoinColumn({
    //     name: 'boardId'
    // })
    // board: Board

    // @ApiProperty({ readOnly: true })
    // @ManyToMany(type => User, user => user.tasks, {
    //     cascade: true,
    //     eager: true
    // })
    // @JoinTable({
    //     name: 'task_users',
    //     joinColumn: {
    //       name: 'taskId',
    //       referencedColumnName: 'id'
    //     },
    //     inverseJoinColumn: {
    //       name: 'userId',
    //       referencedColumnName: 'id'
    //     }
    // })
    // members: User[]
}