import { Router } from 'express';
import { getSportsFacilities } from '../controllers/mapController.js';

const router = Router();

router.get('/sportsfacilities', getSportsFacilities);

export default router;