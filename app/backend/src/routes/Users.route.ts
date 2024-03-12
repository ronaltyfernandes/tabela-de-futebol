import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UsersController';
import { newEmailValid, newPasswordValid } from '../middlewares/loginMiddleware';

const userController = new UsersController();

const router = Router();

router.post(
  '/',
  newEmailValid,
  newPasswordValid,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get('/', (req: Request, res: Response) => userController.findAll(req, res));
export default router;
