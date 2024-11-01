import { Request, Response } from 'express';
import handleEndpoint from '../utils/handleEndpoint';
import UserGameModel from '../models/userGameModel';

const readUserGame = async (req: Request, res: Response): Promise<void> => {
    return handleEndpoint(req, res, async (req) => {
        const id = req.params.id;
        if (id) {
            return await UserGameModel.findByPk(id);
        } else {
            return await UserGameModel.findAll();
        }
    });
};

const createUserGame = async (req: Request, res: Response): Promise<void> => {
    return handleEndpoint(req, res, async (req) => {
        const bodyData = req?.body;
        if (bodyData) {
            return await UserGameModel.create(bodyData);
        } else {
            return null;
        }
    });
};

const updateUserGame = async (req: Request, res: Response): Promise<void> => {
    return handleEndpoint(req, res, async (req) => {
        const id = req.params.id;
        const bodyData = req?.body;
        if (id && bodyData) {
            const userGame = await UserGameModel.findByPk(id);
            if (userGame) {
                Object.assign(userGame, bodyData);
                return await userGame.save();
            } else {
                return null;
            }
        } else {
            return null;
        }
    });
};

const deleteUserGame = async (req: Request, res: Response): Promise<void> => {
    return handleEndpoint(req, res, async (req) => {
        const id = req?.params?.id;
        if (id) {
            const userGame = await UserGameModel.findByPk(id);
            if (userGame) {
                return await userGame.destroy();
            } else {
                return null;
            }
        } else {
            return null;
        }
    });
};

export default {
    readUserGame,
    createUserGame,
    updateUserGame,
    deleteUserGame
};