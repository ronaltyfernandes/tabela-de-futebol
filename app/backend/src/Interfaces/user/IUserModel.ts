// import { NewEntity } from '..';
import userType from './Users';

export interface IUserModel {
  login(email:string): Promise<userType | null>,
  validateToken(email:string): Promise<{ role: string } | null>
}
