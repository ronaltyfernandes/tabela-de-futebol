import Matches from '../database/models/Maches';
import Teams from '../database/models/TeamsModel';

import { IMatches } from '../Interfaces/matches/IMatches';
import matchesType from '../Interfaces/matches/Matches';

export default class matchesModel implements IMatches {
  private model = Matches;
  private teams = Teams;

  async findAll(): Promise<matchesType[]> {
    const dbData = await this.model.findAll();
    const teams = await this.teams.findAll();
    const homeTeam = dbData.map((homeT) => {
      const resultado = {
        id: homeT.id,
        homeTeamId: homeT.homeTeamId,
        homeTeamGoals: homeT.homeTeamGoals,
        awayTeamId: homeT.awayTeamId,
        awayTeamGoals: homeT.awayTeamGoals,
        inProgress: homeT.inProgress,
        homeTeam: { teamName:
           teams.find((team) => (team.id === homeT.homeTeamId ? team.teamName : false))?.teamName },
        awayTeam: { teamName:
          teams.find((team) => (team.id === homeT.awayTeamId ? team.teamName : false))?.teamName },
      };
      return resultado;
    });
    return homeTeam;
  }
}
