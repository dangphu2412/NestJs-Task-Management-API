import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardRepository } from "./Board.repository";
import { Board } from "./Board.entity";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: BoardRepository
  ) {}
}