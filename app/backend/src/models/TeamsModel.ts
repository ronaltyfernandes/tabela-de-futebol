// src/models/BookModel.ts

import Teams from '../database/models/TeamsModel';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import ITeams from '../Interfaces/teams/Teams';
// import { NewEntity } from '../interfaces';

export default class TeamsModel implements ITeamsModel {
  private model = Teams;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }
}
