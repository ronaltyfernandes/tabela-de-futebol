import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import { tokenValid } from '../middlewares/loginMiddleware';

const userController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => userController.findAll(req, res));
router.patch(
  '/:id/finish',
  tokenValid,
  (req: Request, res: Response) => userController.finishMatch(req, res),
);
router.patch(
  '/:id',
  tokenValid,
  (req: Request, res: Response) => userController.updateGoals(req, res),
);

router.post(
  '/',
  tokenValid,
  (req: Request, res: Response) => userController.createMatch(req, res),
);

export default router;
