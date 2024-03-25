import teams from './Teams';

export interface ITeamsModel {
  findAll(): Promise<teams[]>,
  findById(id: teams['id']): Promise<teams | null>
}
