import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    content: string;

    @Column()
    status: TaskStatus;

}