import { Router } from 'express';
import mapRouter from './routes/maprouter.js';

const router = Router();

router.use('/map', mapRouter);

export default router;