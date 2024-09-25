import { Request, Response } from 'express';
import UserModel from '../models/userModel';

const readUser = async (req: Request, res: Response): Promise<void> => {
    let result: any;
    let status: number = 200;
    let error: boolean = false;
    const id = req?.params?.id;
    const queryParams = req?.query;
    if (id) {
        result = await UserModel.findByPk(id);
    } else {
        result = await UserModel.findAll();
    }
    res.status(status).json({error, data: result});
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