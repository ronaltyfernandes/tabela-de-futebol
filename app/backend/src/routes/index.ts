import { Router } from 'express';
import teamsRoute from './Teams.route';

const router = Router();

router.use('/teams', teamsRoute);

export default router;
