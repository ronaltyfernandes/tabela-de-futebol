import matchesInterface from '../Interfaces/matches/Matches';
import MatchesModel from '../models/Matches';
import { IMatches } from '../Interfaces/matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

// import { ServiceResponse, ServiceMessage } from '../interfaces/ServiceResponse';

export default class MatchesServices {
  constructor(
    private matchesModel: IMatches = new MatchesModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<matchesInterface[]>> {
    const allmaches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allmaches };
  }

  public async findByProgress(inProgress:boolean): Promise<ServiceResponse<matchesInterface[]>> {
    const allmaches = await this.matchesModel.findByProgress(inProgress);
    return { status: 'SUCCESSFUL', data: allmaches };
  }
}
