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

  async findById(id:number): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;
    return dbData;
  }
}
