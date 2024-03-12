// import { NewEntity } from '..';
import userType from './Users';

export interface IUserModel {
  // create(data: Partial<IBook>): Promise<IBook>,
  findAll(): Promise<userType[]>,
  login(email:string): Promise<userType | null>,
  validateToken(email:string): Promise<{ role: string } | null>

  // update(id: IBook['id'], data: Partial<NewEntity<IBook>>): Promise<IBook | null>,
  // delete(id: IBook['id']): Promise<number>,
}
