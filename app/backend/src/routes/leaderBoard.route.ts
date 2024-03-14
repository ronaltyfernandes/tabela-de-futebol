import { Request, Router, Response } from 'express';
import LeaderBoard from '../controllers/leaderBoard';

const leaderBoardController = new LeaderBoard();

const router = Router();

router.get('/home', (req: Request, res: Response) => leaderBoardController.findAllHome(req, res));
router.get('/away', (req: Request, res: Response) => leaderBoardController.findAllAway(req, res));
router.get('/', (req: Request, res: Response) => leaderBoardController.findAll(req, res));

export default router;
