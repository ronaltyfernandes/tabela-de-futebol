// src/controllers/BookController.ts

import { Request, Response } from 'express';
import UserServices from '../services/UserServices';
import { mapStatusHTTP } from '../utils/mapStatusHttp';

class UsersController {
  constructor(
    private userService = new UserServices(),
  ) { }

  public async findAll(_req: Request, res: Response) {
    const serviceResponse = await this.userService.findAll();
    return res.status(mapStatusHTTP.successful).json(serviceResponse.data);
  }

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
}

export default UsersController;
