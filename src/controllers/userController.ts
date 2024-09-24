import { Request, Response } from 'express';
import UserModel from '../models/userModel';

const userRead = async (req: Request, res: Response): Promise<void> => {
    res.json('userRead');
}

export default {
    userRead
}