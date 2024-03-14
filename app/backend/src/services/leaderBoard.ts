// src/services/BookService.ts

import { lboardType } from '../Interfaces/leaderBoardes/TypeLBord';
import LeaderboardsModel from '../models/LeaderboardsModel';
// import { IBook } from '../interfaces/books/IBook';
import { ILeaderBoardModel } from '../Interfaces/leaderBoardes/ILeaderBoard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

// import { ServiceResponse, ServiceMessage } from '../interfaces/ServiceResponse';

export default class TeamsServices {
  constructor(
    private teamsModel: ILeaderBoardModel = new LeaderboardsModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<lboardType[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
