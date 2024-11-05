import { Request, Response } from 'express';
import userGameController from '../controllers/userGameController';
import UserGameModel from '../models/userGameModel';

jest.mock('../models/userGameModel');

describe('UserGame Controller', () => {
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
    describe('readUserGame', () => {
        it('Should return all user games', async () => {
            const userGames = [{ id: 1, userId: 1, gameId: 1 }];
            (UserGameModel.findAll as jest.Mock).mockResolvedValue(userGames);
            await userGameController.readUserGame(req as Request, res as Response);
            expect(UserGameModel.findAll).toHaveBeenCalled();
            expect(jsonMock).toHaveBeenCalledWith({
                data: userGames,
                error: false,
                message: 'Success!',
            });
        });
        it('Should return a user game by ID', async () => {
            const userGame = { id: 1, userId: 1, gameId: 1 };
            req.params = { id: '1' };
            (UserGameModel.findByPk as jest.Mock).mockResolvedValue(userGame);
            await userGameController.readUserGame(req as Request, res as Response);
            expect(UserGameModel.findByPk).toHaveBeenCalledWith('1');
            expect(jsonMock).toHaveBeenCalledWith({
                data: userGame,
                error: false,
                message: 'Success!',
            });
        });
    });
    describe('createUserGame', () => {
        it('Should create a new user game', async () => {
            const userGameData = { userId: 1, gameId: 1 };
            const createdUserGame = { id: 1, ...userGameData };
            req.body = userGameData;
            (UserGameModel.create as jest.Mock).mockResolvedValue(createdUserGame);
            await userGameController.createUserGame(req as Request, res as Response);
            expect(UserGameModel.create).toHaveBeenCalledWith(userGameData);
            expect(jsonMock).toHaveBeenCalledWith({
                data: createdUserGame,
                error: false,
                message: 'Success!',
            });
        });
    });
    describe('updateUserGame', () => {
        it('Should update an existing user game', async () => {
            const userGame = { id: 1, userId: 1, gameId: 1, save: jest.fn().mockResolvedValue(true) };
            req.params = { id: '1' };
            req.body = { gameId: 2 };
            (UserGameModel.findByPk as jest.Mock).mockResolvedValue(userGame);
            await userGameController.updateUserGame(req as Request, res as Response);
            expect(UserGameModel.findByPk).toHaveBeenCalledWith('1');
            expect(userGame.save).toHaveBeenCalled();
            expect(jsonMock).toHaveBeenCalledWith({
                data: userGame,
                error: false,
                message: 'Success!',
            });
        });
        it('Should return null if the user game is not found', async () => {
            req.params = { id: '1' };
            req.body = { gameId: 2 };
            (UserGameModel.findByPk as jest.Mock).mockResolvedValue(null);
            await userGameController.updateUserGame(req as Request, res as Response);
            expect(UserGameModel.findByPk).toHaveBeenCalledWith('1');
            expect(jsonMock).toHaveBeenCalledWith({
                data: null,
                error: true,
                message: 'Bad Request!',
            });
        });
    });
    describe('deleteUserGame', () => {
        it('Should delete a user game by ID', async () => {
            const userGame = { id: 1, destroy: jest.fn().mockResolvedValue(true) };
            req.params = { id: '1' };
            (UserGameModel.findByPk as jest.Mock).mockResolvedValue(userGame);
            await userGameController.deleteUserGame(req as Request, res as Response);
            expect(UserGameModel.findByPk).toHaveBeenCalledWith('1');
            expect(userGame.destroy).toHaveBeenCalled();
            expect(jsonMock).toHaveBeenCalledWith({
                data: true,
                error: false,
                message: 'Success!',
            });
        });
        it('Should return null if the user game is not found', async () => {
            req.params = { id: '1' };
            (UserGameModel.findByPk as jest.Mock).mockResolvedValue(null);
            await userGameController.deleteUserGame(req as Request, res as Response);
            expect(UserGameModel.findByPk).toHaveBeenCalledWith('1');
            expect(jsonMock).toHaveBeenCalledWith({
                data: null,
                error: true,
                message: 'Bad Request!',
            });
        });
    });
});