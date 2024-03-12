// src/controllers/BookController.ts

import { Request, Response } from 'express';
import MatchesServices from '../services/MatchesServices';
import { mapStatusHTTP } from '../utils/mapStatusHttp';

class TeamsController {
  constructor(
    private teamsService = new MatchesServices(),
  ) { }

  public async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const serviceResponse = await this.teamsService.findAll();
      return res.status(mapStatusHTTP.successful).json(serviceResponse.data);
    }
    const convertToBollean = !!inProgress('true');
    const serviceResponse = await this.teamsService.findByProgress(convertToBollean);
    return serviceResponse;
  }
}

export default TeamsController;
