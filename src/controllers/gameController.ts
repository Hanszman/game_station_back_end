import { Request, Response } from 'express';
import handleEndpoint from '../utils/handleEndpoint';
import GameModel from '../models/gameModel';

const readGame = async (req: Request, res: Response): Promise<void> => {
    return handleEndpoint(req, res, async (req) => {
        const id = req?.params?.id;
        if (id) {
            return await GameModel.findByPk(id);
        } else {
            return await GameModel.findAll();
        }
    });
}

export default {
    readGame
}