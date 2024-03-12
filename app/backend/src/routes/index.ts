import { Router } from 'express';
import teamsRoute from './Teams.route';
import userRoute from './Users.route';

const router = Router();

router.use('/teams', teamsRoute);
router.use('/login', userRoute);

export default router;
