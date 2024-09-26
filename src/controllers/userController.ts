import { Request, Response } from 'express';
import handleEndpoint from '../utils/handleEndpoint';
import UserModel from '../models/userModel';
import QueryOptions from '../utils/classes/QueryOptions';

const readUser = async (req: Request, res: Response): Promise<void> => {
    return handleEndpoint(req, res, async (req) => {
        const id = req?.params?.id;
        const queryParams = req?.query;
        const queryOptions = new QueryOptions<UserModel>();
        console.log('queryOptions', queryOptions);
        if (id) {
            return await UserModel.findByPk(id);
        } else {
            return await UserModel.findAll();
        }
    });
}

const createUser = async (req: Request, res: Response): Promise<void> => {
    res.json('readUser');
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
    res.json('readUser');
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    res.json('readUser');
}

export default {
    readUser,
    createUser,
    updateUser,
    deleteUser
}