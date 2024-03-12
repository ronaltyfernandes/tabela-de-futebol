import * as bcrypt from 'bcryptjs';
import { generateToken } from '../utils/token';
import userInterface from '../Interfaces/user/Users';
import UserModel from '../models/UsersModel';
import { IUserModel } from '../Interfaces/user/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { message } from '../utils/mapStatusHttp';

// import { ServiceResponse, ServiceMessage } from '../interfaces/ServiceResponse';

export default class UserServices {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<userInterface[]>> {
    const allTeams = await this.userModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async login(email:string, password:string): Promise<ServiceResponse<{ token:string }>> {
    const dataValue = await this.userModel.login(email);
    if (!dataValue) {
      return { status: 'NOT_FOUND', data: { message: message.invalidEmailOrPassword } };
    }

    if (!bcrypt.compareSync(password, dataValue.password)) {
      return { status: 'UNAUTHORIZED', data: { message: message.invalidEmailOrPassword } };
    }
    const token = generateToken({ email });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
