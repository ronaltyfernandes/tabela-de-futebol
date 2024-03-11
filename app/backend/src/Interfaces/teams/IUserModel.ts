// import { NewEntity } from '..';

export interface IUserModel {
  // create(data: Partial<IBook>): Promise<IBook>,
  // findAll(): Promise<teams[]>,
  login(password:string, email:string): Promise<{ token: string } | null>
  // update(id: IBook['id'], data: Partial<NewEntity<IBook>>): Promise<IBook | null>,
  // delete(id: IBook['id']): Promise<number>,
}
