import matchesType from './Matches';
import { payloadUpdateGoals, createMatch } from './types';

export interface IMatches {
  findAll(): Promise<matchesType[]>,
  findByProgress(inProgress:boolean): Promise<matchesType[]>
  finishMatch(id: number): Promise<number[]>,
  updateGoals(payload:payloadUpdateGoals): Promise<number[]>,
  createMatch(payload:createMatch): Promise<any>,
}
