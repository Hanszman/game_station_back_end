import { Request, Response } from 'express';
import sequelize from '../database/db';
import handleEndpoint from '../utils/handleEndpoint';

const homeRoute = async (req: Request, res: Response): Promise<void> => {
    res.send('Welcome to Game Station API! Access a valid endpoint route in the URL');
}

const dbRoute = async (req: Request, res: Response): Promise<void> => {
    return handleEndpoint(req, res, async () => {
        return await sequelize.query('SELECT 1 + 1 AS solution');
    });
}

export default {
    homeRoute,
    dbRoute
}