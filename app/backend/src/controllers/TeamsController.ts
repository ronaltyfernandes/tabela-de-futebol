// src/controllers/BookController.ts

import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import mapStatusHTTP from '../utils/mapStatusHttp';

class BookController {
  constructor(
    private bookService = new TeamsService(),
  ) { }

  public async getAllBooks(_req: Request, res: Response) {
    const serviceResponse = await this.bookService.getAllTeams();
    res.status(mapStatusHTTP.successful).json(serviceResponse.data);
  }
}

export default BookController;
