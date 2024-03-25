import Teams from '../database/models/TeamsModel';
import Maches from '../database/models/Maches';

import { ILeaderBoardModel } from '../Interfaces/leaderBoardes/ILeaderBoard';
import { lboardType } from '../Interfaces/leaderBoardes/TypeLBord';
import matchesType from '../Interfaces/matches/Matches';
import teamsType from '../Interfaces/teams/Teams';

function calcularPontos(team:teamsType, match:matchesType, valores:lboardType, HomeGame: boolean):
lboardType | undefined {
  const novosValores = { ...valores };
  const isHomeTeam = match.homeTeamId === team.id;
  const isAwayTeam = match.awayTeamId === team.id;
  const teamGoals = isHomeTeam ? match.homeTeamGoals : match.awayTeamGoals;
  const opponentGoals = isHomeTeam ? match.awayTeamGoals : match.homeTeamGoals;

  if ((HomeGame && isHomeTeam) || (!HomeGame && isAwayTeam)) {
    novosValores.totalGames += 1; novosValores.goalsFavor += teamGoals;
    novosValores.goalsOwn += opponentGoals; novosValores.goalsBalance += teamGoals - opponentGoals;

    if (teamGoals > opponentGoals) {
      novosValores.totalVictories += 1; novosValores.totalPoints += 3;
    } else if (teamGoals < opponentGoals) {
      novosValores.totalLosses += 1;
    } else { novosValores.totalDraws += 1; novosValores.totalPoints += 1; }
  }
  return match.inProgress ? undefined : novosValores;
}

function calcularPontosGeral(team:teamsType, match:matchesType, valores:lboardType):
lboardType | undefined {
  const novosValores = { ...valores };
  const isHomeTeam = match.homeTeamId === team.id;
  const isAwayTeam = match.awayTeamId === team.id;

  if (isHomeTeam || isAwayTeam) {
    const teamGoals = isHomeTeam ? match.homeTeamGoals : match.awayTeamGoals;
    const opponentGoals = isHomeTeam ? match.awayTeamGoals : match.homeTeamGoals;

    novosValores.totalGames += 1; novosValores.goalsFavor += teamGoals;
    novosValores.goalsOwn += opponentGoals; novosValores.goalsBalance += teamGoals - opponentGoals;

    if (teamGoals > opponentGoals) {
      novosValores.totalVictories += 1; novosValores.totalPoints += 3;
    } else if (teamGoals < opponentGoals) {
      novosValores.totalLosses += 1;
    } else { novosValores.totalDraws += 1; novosValores.totalPoints += 1; }
  }
  return match.inProgress ? undefined : novosValores;
}

function leaderBoardesValues(team: teamsType, matchesList: matchesType[], homeGame:boolean) {
  let valores = { name: team.teamName,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    totalPoints: 0,
    efficiency: 0 };

  matchesList.forEach((match) => {
    const validGame = calcularPontos(team, match, valores, homeGame);
    if (validGame !== undefined) valores = validGame;
  });
  valores.efficiency = valores.totalPoints; valores.efficiency /= 3 * valores.totalGames;
  valores.efficiency = parseFloat(((valores.efficiency) * 100).toFixed(2));

  return valores;
}

function leaderBoardesAll(team: teamsType, matchesList: matchesType[]) {
  let valores = { name: team.teamName,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    totalPoints: 0,
    efficiency: 0 };

  matchesList.forEach((match) => {
    const validGame = calcularPontosGeral(team, match, valores);
    if (validGame !== undefined) valores = validGame;
  });
  valores.efficiency = valores.totalPoints; valores.efficiency /= 3 * valores.totalGames;
  valores.efficiency = parseFloat(((valores.efficiency) * 100).toFixed(2));

  return valores;
}

function ordenaValores(values:lboardType[]) {
  const valuesOrdened = values.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints; // Ordena por totalPoints decrescente
    } if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories; // Ordena por totalVictories decrescente
    } if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance; // Ordena por goalsBalance decrescente
    }
    return b.goalsFavor - a.goalsFavor; // Ordena por goalsFavor decrescente
  });
  return valuesOrdened;
}

export default class LeaderBoardsModel implements ILeaderBoardModel {
  private teams = Teams;
  private matches = Maches;

  async findAllHome(): Promise<lboardType[]> {
    const teamsList = await this.teams.findAll({ attributes: { exclude: ['password'] } });
    const matchesList = await this.matches.findAll();
    const values = teamsList.map((team:teamsType) => {
      const returnValues = leaderBoardesValues(team, matchesList, true);
      return returnValues;
    });
    const sortedValues = ordenaValores(values);
    return sortedValues;
  }

  async findAllAway(): Promise<lboardType[]> {
    const teamsList = await this.teams.findAll({ attributes: { exclude: ['password'] } });
    const matchesList = await this.matches.findAll();
    const values = teamsList.map((team:teamsType) => {
      const returnValues = leaderBoardesValues(team, matchesList, false);
      return returnValues;
    });
    const sortedValues = ordenaValores(values);
    return sortedValues;
  }

  async findAll(): Promise<lboardType[]> {
    const teamsList = await this.teams.findAll({ attributes: { exclude: ['password'] } });
    const matchesList = await this.matches.findAll();
    const values = teamsList.map((team:teamsType) => {
      const returnValues = leaderBoardesAll(team, matchesList);
      return returnValues;
    });
    const sortedValues = ordenaValores(values);
    return sortedValues;
  }
}
