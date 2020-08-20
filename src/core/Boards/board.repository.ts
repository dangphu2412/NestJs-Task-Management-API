import { Repository, EntityRepository } from "typeorm";
import { Board } from "@src/core/Boards/board.entity";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}