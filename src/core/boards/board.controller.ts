import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, Patch, Delete, ValidationPipe } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}
}
