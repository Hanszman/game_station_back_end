import { Request, Response } from 'express';

const handleEndpoint = async (
    req: Request,
    res: Response,
    callback: (req: Request) => Promise<any>
): Promise<void> => {
    let result: any;
    let status: number = 200;
    let error: boolean = false;
    try {
        result = await callback(req);
    } catch (err: any) {
        status = 500;
        error = true;
        result = err.message;
    }
    res.status(status).json({ error, data: result });
};

export default handleEndpoint;