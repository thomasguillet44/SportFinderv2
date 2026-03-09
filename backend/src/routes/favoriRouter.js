import { Router } from 'express';
import { addFavori, getFavorisByUserId, deleteFavori } from '../controllers/favoriController.js';

const router = Router();

router.post('/addFavori', addFavori);

router.get('/getFavoris/:userId', getFavorisByUserId);

router.delete('/deleteFavori/:favoriId', deleteFavori);

export default router;