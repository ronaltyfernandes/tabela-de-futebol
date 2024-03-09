import teams from './Teams';
// import { NewEntity } from '..';

export interface ITeamsModel {
  // create(data: Partial<IBook>): Promise<IBook>,
  findAll(): Promise<teams[]>,
  // findById(id: IBook['id']): Promise<IBook | null>
  // update(id: IBook['id'], data: Partial<NewEntity<IBook>>): Promise<IBook | null>,
  // delete(id: IBook['id']): Promise<number>,
}
