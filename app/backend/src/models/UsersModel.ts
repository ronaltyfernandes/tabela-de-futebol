// // src/models/BookModel.ts

// import Teams from '../database/models/TeamsModel';
// import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
// import ITeams from '../Interfaces/teams/Teams';
// // import { NewEntity } from '../interfaces';

// export default class TeamsModel implements ITeamsModel {
//   private model = Teams;

//   async login(email:string, password: string): Promise<ITeams | null> {
//     const dbData = await this.model.findByPk(email, password);
//     if (dbData == null) return null;
//     return dbData;
//   }
// }
