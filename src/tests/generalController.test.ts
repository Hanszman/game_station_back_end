import { Request, Response } from 'express';
import handleEndpoint from '../utils/handleEndpoint';
import sequelize from '../database/db';
import generalController from '../controllers/generalController';

jest.mock('../database/db');
jest.mock('../utils/handleEndpoint');

describe('General Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let sendMock: jest.Mock;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;
    beforeEach(() => {
        sendMock = jest.fn();
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnThis();
        req = {};
        res = { send: sendMock, json: jsonMock, status: statusMock };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('homeRoute', () => {
        it('Should return the welcome message', async () => {
            await generalController.homeRoute(req as Request, res as Response);
            expect(sendMock).toHaveBeenCalledWith('Welcome to Game Station API! Access a valid endpoint route in the URL');
        });
    });
    describe('dbRoute', () => {
        it('Should return the solution of the database query', async () => {
            const dbResult = [{ solution: 2 }];
            (sequelize.query as jest.Mock).mockResolvedValue(dbResult);
            await generalController.dbRoute(req as Request, res as Response);
            expect(handleEndpoint).toHaveBeenCalledWith(req, res, expect.any(Function));
        });
    });
});