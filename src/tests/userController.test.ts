import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import userController from '../controllers/userController';
import UserModel from '../models/userModel';

jest.mock('../models/userModel');
jest.mock('bcryptjs');

describe('User Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;
    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnThis();
        req = { params: {}, body: {} };
        res = { json: jsonMock, status: statusMock };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('readUser', () => {
        it('Should return all users', async () => {
            const users = [{ id: 1, name: 'User1' }];
            (UserModel.findAll as jest.Mock).mockResolvedValue(users);
            await userController.readUser(req as Request, res as Response);
            expect(UserModel.findAll).toHaveBeenCalled();
            expect(jsonMock).toHaveBeenCalledWith({
                data: users,
                error: false,
                message: 'Success!',
            });
        });
        it('Should return a user by ID', async () => {
            const user = { id: 1, name: 'User1' };
            req.params = { id: '1' };
            (UserModel.findByPk as jest.Mock).mockResolvedValue(user);
            await userController.readUser(req as Request, res as Response);
            expect(UserModel.findByPk).toHaveBeenCalledWith('1');
            expect(jsonMock).toHaveBeenCalledWith({
                data: user,
                error: false,
                message: 'Success!',
            });
        });
    });
    describe('createUser', () => {
        it('Must create a new user with password hash', async () => {
            const user = {
                id: 1,
                name: 'User1',
                password: 'hashedPassword',
            };
            req.body = {
                name: 'User1',
                password: 'plainPassword',
            };
            const hashedPassword = 'hashedPassword';
            (UserModel.create as jest.Mock).mockResolvedValue(user);
            (bcrypt.hashSync as jest.Mock).mockReturnValue(hashedPassword);
            await userController.createUser(req as Request, res as Response);
            expect(UserModel.create).toHaveBeenCalledWith({
                ...req.body,
                password: hashedPassword,
            });
            expect(jsonMock).toHaveBeenCalledWith({
                data: user,
                error: false,
                message: 'Success!',
            });
        });
    });
    describe('updateUser', () => {
        it('Must update a user with correct password', async () => {
            const user = {
                id: 1,
                username: 'user1',
                name: 'User1',
                password: 'oldPassword',
                email: 'user1@example.com',
                save: jest.fn().mockResolvedValue({
                    id: 1,
                    username: 'user1',
                    name: 'User1',
                    email: 'user1@example.com',
                    password: 'newHashedPassword',
                }),
                _attributes: {},
                dataValues: {},
            } as unknown as UserModel;
            req.params = { id: '1' };
            req.body = { oldPassword: 'oldPassword', password: 'newPassword' };
            (UserModel.findByPk as jest.Mock).mockResolvedValue(user);
            const salt = 'randomSalt';
            const hashedPassword = 'newHashedPassword';
            (bcrypt.genSaltSync as jest.Mock).mockReturnValue(salt);
            (bcrypt.hashSync as jest.Mock).mockReturnValue(hashedPassword);
            await userController.updateUser(req as Request, res as Response);
            const expectedUser = {
                id: 1,
                username: 'user1',
                name: 'User1',
                email: 'user1@example.com',
                password: 'newHashedPassword',
            };
            expect(UserModel.findByPk).toHaveBeenCalledWith('1');
            expect(bcrypt.hashSync).toHaveBeenCalledWith('newPassword', salt);
            expect(user.save).toHaveBeenCalled();
            expect(jsonMock).toHaveBeenCalledWith({
                data: expectedUser,
                error: false,
                message: 'Success!',
            });
        });
        it('Should return null if the old username or password is incorrect', async () => {
            const user = {
                id: 1,
                username: 'user1',
                name: 'User1',
                password: 'differentPassword',
                email: 'user1@example.com',
                _attributes: {},
                dataValues: {},
            } as unknown as UserModel;
            req.params = { id: '1' };
            req.body = { oldPassword: 'oldPassword', password: 'newPassword' };
            (UserModel.findByPk as jest.Mock).mockResolvedValue(user);
            await userController.updateUser(req as Request, res as Response);
            expect(UserModel.findByPk).toHaveBeenCalledWith('1');
            expect(jsonMock).toHaveBeenCalledWith({
                data: null,
                error: true,
                message: 'Bad Request!',
            });
        });
    });
    describe('deleteUser', () => {
        it('Must delete a user by ID', async () => {
            const user = { id: 1, name: 'User1', destroy: jest.fn().mockResolvedValue(true) };
            req.params = { id: '1' };
            (UserModel.findByPk as jest.Mock).mockResolvedValue(user);
            await userController.deleteUser(req as Request, res as Response);
            expect(UserModel.findByPk).toHaveBeenCalledWith('1');
            expect(user.destroy).toHaveBeenCalled();
            expect(jsonMock).toHaveBeenCalledWith({
                data: true,
                error: false,
                message: 'Success!',
            });
        });
        it('Should return null if the user is not found', async () => {
            req.params = { id: '1' };
            (UserModel.findByPk as jest.Mock).mockResolvedValue(null);
            await userController.deleteUser(req as Request, res as Response);
            expect(UserModel.findByPk).toHaveBeenCalledWith('1');
            expect(jsonMock).toHaveBeenCalledWith({
                data: null,
                error: true,
                message: 'Bad Request!',
            });
        });
    });
});