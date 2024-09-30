import express from 'express';
import generalController from '../controllers/generalController';
import loginController from '../controllers/loginController';
import userController from '../controllers/userController';
const router = express.Router();

// GET
router.get('/', generalController.homeRoute);
router.get('/user', userController.readUser);
router.get('/user/:id', userController.readUser);
router.get('/db', generalController.dbRoute);

// POST
router.post('/login', loginController.loginAuth);
router.post('/user', userController.createUser);

// PUT
router.put('/user/:id', userController.updateUser);

// DELETE
router.delete('/user/:id', userController.deleteUser);

export default router;