import express, { Request, Response } from 'express';
import sequelize from '../database/db';
import loginController from '../controllers/loginController';
import userController from '../controllers/userController';
const router = express.Router();

// GET
router.get('/', (req: Request, res: Response) => res.send('Welcome to Game Station API! Access a valid endpoint route in the URL'));
router.get('/user', userController.readUser);
router.get('/user/:id', userController.readUser);
router.get('/db', async (req: Request, res: Response) => {
    try {
        const [results, metadata] = await sequelize.query('SELECT 1 + 1 AS solution');
        res.status(200).json({data: {results, metadata}});
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// POST
router.post('/login', loginController.loginAuth);
router.post('/user', userController.createUser);

// PUT
router.put('/user', userController.updateUser);

// DELETE
router.delete('/user', userController.deleteUser);

export default router;