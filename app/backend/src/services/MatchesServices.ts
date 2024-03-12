import matchesInterface from '../Interfaces/matches/Matches';
import MatchesModel from '../models/Matches';
import { IMatches } from '../Interfaces/matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { message } from '../utils/mapStatusHttp';
import { payloadUpdateGoals, createMatch } from '../Interfaces/matches/types';

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

  public async finishMatch(id:number): Promise<ServiceResponse<{ message:string }>> {
    const allmaches = await this.matchesModel.finishMatch(id);
    if (!allmaches['0'] || allmaches['0'] === 0) {
      return { status: 'NOT_FOUND', data: { message: message.notFond } };
    }
    return { status: 'SUCCESSFUL', data: { message: message.finished } };
  }

  public async updateGoals(payload: payloadUpdateGoals):
  Promise<ServiceResponse<{ message:string }>> {
    const allmaches = await this.matchesModel.updateGoals(payload);
    if (!allmaches['0'] || allmaches['0'] === 0) {
      return { status: 'NOT_FOUND', data: { message: message.notFond } };
    }
    return { status: 'SUCCESSFUL', data: { message: message.ok } };
  }

  public async createMatch(payload: createMatch):
  Promise<ServiceResponse<{ message:string }>> {
    const allmaches = await this.matchesModel.createMatch(payload);
    console.log(allmaches);
    if (!allmaches['0'] || allmaches['0'] === 0) {
      return { status: 'NOT_FOUND', data: { message: message.notFond } };
    }
    return { status: 'SUCCESSFUL', data: { message: message.ok } };
  }
}
