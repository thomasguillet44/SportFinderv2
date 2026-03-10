import { Router } from 'express';
import { getSportsFacilities } from '../controllers/mapController.js';

const router = Router();

router.get('/getsportsfacilities', getSportsFacilities);

export default router;