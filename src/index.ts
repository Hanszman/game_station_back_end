import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import router from './routes/apiRoutes';
import { Server } from 'socket.io';
import './models/initializeModels';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 3001;
const host = process.env.HOST || 'http://localhost';
const webApp = process.env.WEB_APP || 'http://localhost:3000';
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: webApp,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
});

app.use('/', router);
io.on('connection', (socket: any) => {
    console.log(`Socket conectado: ${socket.id}`);
});

server.listen(port, () => {
    console.log(`Server is running on ${host}:${port}`);
});