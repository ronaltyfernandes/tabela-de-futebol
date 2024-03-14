import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UsersController';
import { newEmailValid, newPasswordValid, tokenValid } from '../middlewares/loginMiddleware';

const userController = new UsersController();

const router = Router();

router.post(
  '/',
  newEmailValid,
  newPasswordValid,
  (req: Request, res: Response) => userController.login(req, res),
);
router.get(
  '/role',
  tokenValid,
  (req: Request, res: Response) => userController.validateToken(req, res),
);

export default router;
