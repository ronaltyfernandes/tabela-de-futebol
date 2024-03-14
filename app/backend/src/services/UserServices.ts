import * as bcrypt from 'bcryptjs';
import { generateToken } from '../utils/token';
import UserModel from '../models/UsersModel';
import { IUserModel } from '../Interfaces/user/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { message } from '../utils/mapStatusHttp';

// import { ServiceResponse, ServiceMessage } from '../interfaces/ServiceResponse';

export default class UserServices {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

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

  public async validateToken(email: string): Promise<ServiceResponse<{ role:string }>> {
    if (typeof email !== 'string') {
      return { status: 'NOT_FOUND', data: { message: message.invalidToken } };
    }

    const dataValue = await this.userModel.validateToken(email);
    if (!dataValue) {
      return { status: 'NOT_FOUND', data: { message: message.invalidToken } };
    }
    return { status: 'SUCCESSFUL', data: { role: dataValue.role } };
  }
}
