import Matches from '../database/models/Maches';
import Teams from '../database/models/TeamsModel';

import { IMatches } from '../Interfaces/matches/IMatches';
import { payloadUpdateGoals, createMatch } from '../Interfaces/matches/types';
import matchesType from '../Interfaces/matches/Matches';
import teamsType from '../Interfaces/teams/Teams';

const homeTeamList = (matches:matchesType[], teams:teamsType[]) => {
  const listResult = matches.map((homeT) => {
    const resultado = {
      id: homeT.id,
      homeTeamId: homeT.homeTeamId,
      homeTeamGoals: homeT.homeTeamGoals,
      awayTeamId: homeT.awayTeamId,
      awayTeamGoals: homeT.awayTeamGoals,
      inProgress: homeT.inProgress,
      homeTeam: { teamName:
        teams.find((team) => (
          team.id === homeT.homeTeamId ? team.teamName : false))?.teamName },
      awayTeam: { teamName:
        teams.find((team) => (
          team.id === homeT.awayTeamId ? team.teamName : false))?.teamName },
    };
    return resultado;
  });
  return listResult;
};

export default class matchesModel implements IMatches {
  private model = Matches;
  private teams = Teams;

  async findAll(): Promise<matchesType[]> {
    const dbData = await this.model.findAll();
    const teams = await this.teams.findAll();
    const homeTeam = homeTeamList(dbData, teams);
    return homeTeam;
  }

  async findByProgress(inProgress: boolean): Promise<matchesType[]> {
    const dbData = await this.model.findAll();
    const teams = await this.teams.findAll();
    const homeTeam = homeTeamList(dbData, teams);
    const filter = homeTeam.filter((item) => item.inProgress === inProgress);
    return filter;
  }

  async finishMatch(id: number): Promise<number[]> {
    const dbData = await this.model.update({ inProgress: false }, { where: { id } });
    return dbData;
  }

  async updateGoals(payload: payloadUpdateGoals): Promise<number[]> {
    const { id, homeTeamGoals, awayTeamGoals } = payload;
    const dbData = await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return dbData;
  }

  async createMatch(payload: createMatch): Promise<matchesType | undefined> {
    const { homeTeamGoals, awayTeamGoals, awayTeamId, homeTeamId } = payload;
    try {
      const dbData = await this.model.create(
        { homeTeamGoals, awayTeamGoals, awayTeamId, homeTeamId, inProgress: true },
      );

      return dbData.dataValues;
    } catch (error) {
      return undefined;
    }
  }
}
