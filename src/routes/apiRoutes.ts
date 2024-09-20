import express from 'express';
import sequelize from '../database/db';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.get('/db', async (req, res) => {
    try {
        const [results, metadata] = await sequelize.query('SELECT 1 + 1 AS solution');
        res.json(results);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

export default router;