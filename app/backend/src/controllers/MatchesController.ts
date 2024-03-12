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
    const serviceResponse = await this.teamsService.findByProgress(inProgress === 'true');
    return res.status(mapStatusHTTP.successful).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.teamsService.finishMatch(parseFloat(id));
    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(mapStatusHTTP.invalidData).json(serviceResponse.data);
    }
    return res.status(mapStatusHTTP.successful).json(serviceResponse.data);
  }

  public async updateGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { awayTeamGoals, homeTeamGoals } = req.body;
    const serviceResponse = await this.teamsService.updateGoals(
      { awayTeamGoals, homeTeamGoals, id: parseFloat(id) },
    );
    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(mapStatusHTTP.invalidData).json(serviceResponse.data);
    }
    return res.status(mapStatusHTTP.successful).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response) {
    const { awayTeamGoals, homeTeamGoals, homeTeamId, awayTeamId } = req.body;
    const serviceResponse = await this.teamsService.createMatch(
      { awayTeamGoals, homeTeamGoals, awayTeamId, homeTeamId },
    );
    if (serviceResponse.status === 'CONFLICT') {
      return res.status(mapStatusHTTP.conflict).json(serviceResponse.data);
    }
    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(mapStatusHTTP.notFound).json(serviceResponse.data);
    }
    return res.status(mapStatusHTTP.postOk).json(serviceResponse.data);
  }
}

export default TeamsController;
