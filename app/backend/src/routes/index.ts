import { Router } from 'express';
import teamsRoute from './Teams.route';
import userRoute from './Users.route';
import matchesRoute from './Matches.route';
import leaderBoards from './leaderBoard.route';

const router = Router();

router.use('/teams', teamsRoute);
router.use('/login', userRoute);
router.use('/matches', matchesRoute);
router.use('/leaderboard', leaderBoards);

export default router;
