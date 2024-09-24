import { Request, Response } from 'express';
import UserModel from '../models/userModel';

const loginAuth = async (req: Request, res: Response): Promise<void> => {
    res.json('loginAuth');
}

export default {
    loginAuth
}