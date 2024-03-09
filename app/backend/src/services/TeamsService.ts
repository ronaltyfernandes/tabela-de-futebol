// src/services/BookService.ts

import TeamsInterface from '../Interfaces/teams/Teams';
import TeamsModel from '../models/TeamsModel';
// import { IBook } from '../interfaces/books/IBook';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
// import { ServiceResponse, ServiceMessage } from '../interfaces/ServiceResponse';

export default class TeamsServices {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<TeamsInterface[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
