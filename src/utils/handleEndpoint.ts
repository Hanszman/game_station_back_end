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
        if (!result) {
            status = 400;
            error = true;
            message = 'Bad Request!';
        }
    } catch (err: any) {
        result = null;
        status = 500;
        error = true;
        message = err.message;
    }
    res.status(status).json({ error, data: result, message });
};

export default handleEndpoint;