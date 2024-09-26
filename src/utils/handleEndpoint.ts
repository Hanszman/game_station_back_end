import { Request, Response } from 'express';

const handleEndpoint = async (
    req: Request,
    res: Response,
    callback: (req: Request) => Promise<any>
): Promise<void> => {
    let result: any;
    let status: number = 200;
    let error: boolean = false;
    let message: string = 'Success!';
    try {
        result = await callback(req);
    } catch (err: any) {
        result = null;
        status = 500;
        error = true;
        message = err.message;
    }
    res.status(status).json({ error, data: result, message });
};

export default handleEndpoint;