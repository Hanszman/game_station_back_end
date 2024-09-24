import express, { Request, Response } from 'express';
import sequelize from '../database/db';
import loginController from '../controllers/loginController';
import userController from '../controllers/userController';
const router = express.Router();

// GET
router.get('/', (req: Request, res: Response) => res.send('Hello World'));
router.get('/user', userController.userRead);
router.get('/db', async (req: Request, res: Response) => {
    try {
        const [results, metadata] = await sequelize.query('SELECT 1 + 1 AS solution');
        res.status(200).json({results, metadata});
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// POST
router.get('/login', loginController.loginAuth);

// PUT

// DELETE

export default router;