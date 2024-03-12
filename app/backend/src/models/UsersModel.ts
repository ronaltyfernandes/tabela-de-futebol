import User from '../database/models/UsersModel';
import { IUserModel } from '../Interfaces/user/IUserModel';
import userType from '../Interfaces/user/Users';
// import ITeams from '../Interfaces/teams/Teams';
// import { NewEntity } from '../interfaces';

export default class UserModel implements IUserModel {
  private model = User;

  async findAll(): Promise<userType[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async login(email:string): Promise< userType | null> {
    const fundUser = await this.model.findOne({ where: { email } });
    if (fundUser == null) return null;
    return fundUser.dataValues;
  }

  async validateToken(email:string): Promise< { role: string } | null> {
    const fundUser = await this.model.findOne({ where: { email } });
    if (fundUser == null) return null;
    return { role: fundUser.dataValues.role };
  }
}
