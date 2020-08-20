import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

@Entity()
export class Board extends BaseEntity {

    @ApiProperty({ readOnly: true })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Name board' })
    @IsString()
    @Column()
    name: string;

    @ApiProperty({ example: 'https://www.w3schools.com/howto/img_forest.jpg' })
    @IsString()
    @Column({
        default: 'https://www.w3schools.com/howto/img_forest.jpg'
    })
    thumbnail: string;

    /**
     * Relations
     */
    // @ApiProperty({ readOnly: true })
    // @ManyToOne(type => User, user => user.boards, { eager: true })
    // @JoinColumn({
    //     name: 'userId'
    // })
    // author: User;

    // @OneToMany(type => Task, task => task.board)
    // tasks: Task[]
}