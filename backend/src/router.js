import { Router } from 'express';
import mapRouter from './routes/maprouter.js';
import loginRouter from './routes/loginRouter.js';

const router = Router();

router.use('/map', mapRouter);

router.use('/auth', loginRouter);

export default router;