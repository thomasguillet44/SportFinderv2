import { Router } from 'express';
import mapRouter from './routes/maprouter.js';
import loginRouter from './routes/loginRouter.js';
import favoriRouter from './routes/favoriRouter.js';

const router = Router();

router.use('/map', mapRouter);

router.use('/auth', loginRouter);

router.use('/favoris', favoriRouter);

export default router;