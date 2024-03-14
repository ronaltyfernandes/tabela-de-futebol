import { lboardType } from './TypeLBord';

export interface ILeaderBoardModel {
  findAllHome(): Promise<lboardType[]>,
  findAllAway(): Promise<lboardType[]>,
  findAll(): Promise<lboardType[]>,
}
