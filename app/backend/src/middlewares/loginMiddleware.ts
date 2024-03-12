import { Request, Response, NextFunction } from 'express';
import { mapStatusHTTP, message } from '../utils/mapStatusHttp';

const newEmailValid = (req: Request, res: Response, next: NextFunction) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const { email } = req.body;
  if (!email) res.status(mapStatusHTTP.invalidData).json({ message: message.requiredFields });
  if (!emailRegex.test(email)) {
    res.status(mapStatusHTTP.invalidData).json({ message: message.invalidEmail });
  }
  return next();
};

const newPasswordValid = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password) res.status(mapStatusHTTP.invalidData).json({ message: message.requiredFields });
  if (password.length < 6) {
    return res.status(mapStatusHTTP.invalidData).json({ message: message.invalidPassword });
  }
  return next();
};

export { newEmailValid, newPasswordValid };
