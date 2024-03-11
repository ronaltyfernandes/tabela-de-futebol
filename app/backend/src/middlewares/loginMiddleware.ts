import { Request, Response, NextFunction } from 'express';
import { mapStatusHTTP, message } from '../utils/mapStatusHttp';

const newEmailValid = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!email) res.status(mapStatusHTTP.invalidData).json({ message: message.requiredFields });
  return next();
};

const newPasswordValid = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password) res.status(mapStatusHTTP.invalidData).json({ message: message.requiredFields });
  return next();
};

export = { newEmailValid, newPasswordValid };
