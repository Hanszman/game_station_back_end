import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { connectToDatabase } from './database/db';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
})
const port = process.env.PORT || 3001;
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

io.on('connection', (socket: any) => {
    console.log(`Socket conectado: ${socket.id}`);
});

server.listen(port, () => {
    console.log(`Server is running on ${host}:${port}`);
});