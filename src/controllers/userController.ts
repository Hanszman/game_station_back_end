import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import handleEndpoint from '../utils/handleEndpoint';
import UserModel from '../models/userModel';

const readUser = async (req: Request, res: Response): Promise<void> => {
    return handleEndpoint(req, res, async (req) => {
        const id = req?.params?.id;
        if (id) {
            return await UserModel.findByPk(id);
        } else {
            return await UserModel.findAll();
        }
    });
}

const createUser = async (req: Request, res: Response): Promise<void> => {
    return handleEndpoint(req, res, async (req) => {
        const bodyData = req?.body;
        if (bodyData) {
            const password = bodyData?.password ?? '';
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            bodyData.password = hash;
            return await UserModel.create(bodyData);
        } else {
            return null;
        }
    });
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
    return handleEndpoint(req, res, async (req) => {
        const id = req?.params?.id;
        const bodyData = req?.body;
        if (id && bodyData) {
            const user = await UserModel.findByPk(id);
            if (user && user.password === bodyData?.oldPassword) {
                const password = bodyData?.password ?? '';
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                bodyData.password = hash;
                delete bodyData.oldPassword;
                Object.assign(user, bodyData);
                return await user.save();
            } else {
                return null;
            }
        } else {
            return null;
        }
    });
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    return handleEndpoint(req, res, async (req) => {
        const id = req?.params?.id;
        if (id) {
            // TODO: CASCADE: delete all user's in other tables
            const user = await UserModel.findByPk(id);
            if (user) {
                return await user.destroy();
            } else {
                return null;
            }
        } else {
            return null;
        }
    });
}

export default {
    readUser,
    createUser,
    updateUser,
    deleteUser
}