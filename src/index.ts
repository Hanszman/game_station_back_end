import express from 'express';
import { connectToDatabase } from './database/db';

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'http://localhost';

app.get('/', async (req, res) => {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
        res.json(rows);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${host}:${port}`);
});