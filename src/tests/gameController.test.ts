import { Request, Response } from 'express';
import gameController from '../controllers/gameController';
import GameModel from '../models/gameModel';

jest.mock('../models/gameModel');

describe('Game Controller', () => {
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
    describe('readGame', () => {
        it('Should return all games', async () => {
            const games = [{ id: 1, name: 'Game1' }];
            (GameModel.findAll as jest.Mock).mockResolvedValue(games);
            await gameController.readGame(req as Request, res as Response);
            expect(GameModel.findAll).toHaveBeenCalled();
            expect(jsonMock).toHaveBeenCalledWith({
                data: games,
                error: false,
                message: 'Success!',
            });
        });
        it('Should return a game by ID', async () => {
            const game = { id: 1, name: 'Game1' };
            req.params = { id: '1' };
            (GameModel.findByPk as jest.Mock).mockResolvedValue(game);
            await gameController.readGame(req as Request, res as Response);
            expect(GameModel.findByPk).toHaveBeenCalledWith('1');
            expect(jsonMock).toHaveBeenCalledWith({
                data: game,
                error: false,
                message: 'Success!',
            });
        });
    });
});