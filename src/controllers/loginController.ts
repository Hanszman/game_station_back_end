import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import handleEndpoint from '../utils/handleEndpoint';
import UserModel from '../models/userModel';

const loginAuth = async (req: Request, res: Response): Promise<void> => {
    return handleEndpoint(req, res, async (req) => {
        const bodyData = req?.body;
        if (bodyData && bodyData?.username && bodyData?.password) {
            const user = await UserModel.findOne({ where: { username: bodyData.username } });
            if (user && bcrypt.compareSync(bodyData.password, user.password)) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    });
}

export default {
    loginAuth
}