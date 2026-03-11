import express from 'express';
import cors from 'cors';
import router from './router.js';

import { connectToDB } from './configuration/connedctToDB.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors());

const apiPrefix = process.env.NODE_ENV === 'local' ? '/api' : '';
app.use(`${apiPrefix}`, router);

/**
 * Utilisé pour tester si le back est opérationnel pour bien ordonner le lancement 
 * des services dans le docker-compose
 */
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
})

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await connectToDB();
})