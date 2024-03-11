// // src/models/BookModel.ts

// import User from '../database/models/UsersModel';
// import { IUserModel } from '../Interfaces/teams/IUserModel';
// // import ITeams from '../Interfaces/teams/Teams';
// // import { NewEntity } from '../interfaces';

// export default class TeamsModel implements IUserModel {
//   private model = User;

//   async login(email:string, password: string): Promise<{ token:string } | null> {
//     const dbData = await this.model.findOne({ where: { email, password } });
//     if (dbData == null) return null;
//     return dbData;
//   }
// }
