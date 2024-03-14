import { Request, Response } from 'express';
import LeaderBServices from '../services/leaderBoard';
import { mapStatusHTTP } from '../utils/mapStatusHttp';

class leaderBoardController {
  constructor(
    private leaderBServices = new LeaderBServices(),
  ) { }

  public async findAllHome(_req: Request, res: Response) {
    const serviceResponse = await this.leaderBServices.findAllHome();
    return res.status(mapStatusHTTP.successful).json(serviceResponse.data);
  }

  public async findAllAway(_req: Request, res: Response) {
    const serviceResponse = await this.leaderBServices.findAllAway();
    return res.status(mapStatusHTTP.successful).json(serviceResponse.data);
  }

  public async findAll(_req: Request, res: Response) {
    const serviceResponse = await this.leaderBServices.findAll();
    return res.status(mapStatusHTTP.successful).json(serviceResponse.data);
  }
}

export default leaderBoardController;
