import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
// import { tokenValid } from '../middlewares/loginMiddleware';

const userController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => userController.findAll(req, res));

export default router;
