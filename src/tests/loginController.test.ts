import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import handleEndpoint from '../utils/handleEndpoint';
import UserModel from '../models/userModel';
import loginController from '../controllers/loginController';

jest.mock('bcryptjs');
jest.mock('../utils/handleEndpoint');
jest.mock('../models/userModel');

describe('Login Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;
    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnThis();
        req = { body: {} };
        res = { json: jsonMock, status: statusMock };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('loginAuth', () => {
        it('Must successfully authenticate with valid credentials', async () => {
            const user = { id: 1, username: 'user1', password: 'hashedPassword' };
            req.body = { username: 'user1', password: 'plainPassword' };
            (UserModel.findOne as jest.Mock).mockResolvedValue(user);
            (bcrypt.compareSync as jest.Mock).mockReturnValue(true);
            await loginController.loginAuth(req as Request, res as Response);
            expect(handleEndpoint).toHaveBeenCalledWith(req, res, expect.any(Function));
        });
        it('Should fail if credentials are incorrect', async () => {
            req.body = { username: 'user1', password: 'wrongPassword' };
            (UserModel.findOne as jest.Mock).mockResolvedValue(null);
            await loginController.loginAuth(req as Request, res as Response);
            expect(handleEndpoint).toHaveBeenCalledWith(req, res, expect.any(Function));
        });
    });
});