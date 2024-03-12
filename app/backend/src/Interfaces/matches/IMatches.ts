import matchesType from './Matches';

export interface IMatches {
  // create(data: Partial<IBook>): Promise<IBook>,
  findAll(): Promise<matchesType[]>,
  findByProgress(inProgress:boolean): Promise<matchesType[]>
  // update(id: IBook['id'], data: Partial<NewEntity<IBook>>): Promise<IBook | null>,
  // delete(id: IBook['id']): Promise<number>,
}
