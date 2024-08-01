import express from 'express';
import { connectToDatabase } from '../database/db';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.get('/db', async (req, res) => {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
        res.json(rows);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

export default router;