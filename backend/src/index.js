import express from 'express';
import cors from 'cors';
import router from './router.js';

const app = express()
const PORT = 3000

app.use(express.json())

app.use(cors());

app.use('/api', router);

app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})