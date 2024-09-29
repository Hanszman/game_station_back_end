import { Request, Response } from 'express';
import handleEndpoint from '../utils/handleEndpoint';
import UserModel from '../models/userModel';
import QueryOptions from '../utils/classes/QueryOptions';

const readUser = async (req: Request, res: Response): Promise<void> => {
    return handleEndpoint(req, res, async (req) => {
        const id = req?.params?.id;
        // const queryParams = req?.query; // TODO: utilizar para filtrar e ordenar dados, além de fazer joins das tabelas
        const queryOptions = new QueryOptions<UserModel>();
        console.log('queryOptions', queryOptions);
        if (id) {
            return await UserModel.findByPk(id);
        } else {
            return await UserModel.findAll();
        }
    });
}

// TODO: Verificar funcionamento das funções de CRUD abaixo com o postman:
const createUser = async (req: Request, res: Response): Promise<void> => {
    return handleEndpoint(req, res, async (req) => {
        const bodyData = req?.body;
        if (bodyData) {
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
            if (user) {
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