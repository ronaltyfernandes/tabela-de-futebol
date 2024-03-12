import { Request, Response, NextFunction } from 'express';
import { mapStatusHTTP, message } from '../utils/mapStatusHttp';
import { validateToken } from '../utils/token';

const newEmailValid = (req: Request, res: Response, next: NextFunction) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const { email } = req.body;
  if (!email) res.status(mapStatusHTTP.invalidData).json({ message: message.requiredFields });
  if (!emailRegex.test(email)) {
    return res.status(mapStatusHTTP.invalidPost).json({ message: message.invalidEmailOrPassword });
  }
  return next();
};

const newPasswordValid = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password) res.status(mapStatusHTTP.invalidData).json({ message: message.requiredFields });
  if (password.length < 6) {
    return res.status(mapStatusHTTP.invalidPost).json({ message: message.invalidEmailOrPassword });
  }
  return next();
};

const tokenValid = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(mapStatusHTTP.invalidPost).json({ message: message.requiredToken });
  }
  const tokenResult = authorization.split(' ')[1];
  try {
    validateToken(tokenResult);
    return next();
  } catch (error) {
    res.status(mapStatusHTTP.invalidPost).json({ message: message.invalidToken });
  }
};
export { newEmailValid, newPasswordValid, tokenValid };
