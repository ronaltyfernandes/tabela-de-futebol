// src/controllers/BookController.ts

import { Request, Response } from 'express';
import UserServices from '../services/UserServices';
import { mapStatusHTTP, message } from '../utils/mapStatusHttp';

class UsersController {
  constructor(
    private userService = new UserServices(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const serviceResponse = await this.userService.login(email, password);

    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(mapStatusHTTP.invalidPost).json(serviceResponse.data);
    }
    if (serviceResponse.status === 'UNAUTHORIZED') {
      return res.status(mapStatusHTTP.invalidPost).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async validateToken(_req: Request, res: Response) {
    const { email } = res.locals.userData;
    if (!email) {
      return res.status(mapStatusHTTP.invalidPost).json({ message: message.requiredToken });
    }
    const serviceResponse = await this.userService.validateToken(email);

    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(mapStatusHTTP.invalidPost).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}

export default UsersController;
