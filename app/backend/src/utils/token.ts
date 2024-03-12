import * as jwt from 'jsonwebtoken';
import {} from 'bcryptjs';
// import { Login } from '../types/login';

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

type TokenPayload = {
  email: string,
};

// const jwtConfig = {
//   expiresIn: '7d',
//   algorithm: 'HS256',
// };

function generateToken(tokenPayload: TokenPayload): string {
  const token = jwt.sign(tokenPayload, secret);
  return token;
}

function validateToken(token:string) : string | jwt.JwtPayload {
  const value = jwt.verify(token, secret);
  if (!value) {
    return 'invalid token';
  }

  return value;
}
export { generateToken, validateToken };
