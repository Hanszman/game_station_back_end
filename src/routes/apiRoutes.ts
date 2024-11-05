import express from 'express';
import generalController from '../controllers/generalController';
import loginController from '../controllers/loginController';
import userController from '../controllers/userController';
import gameController from '../controllers/gameController';
import userGameController from '../controllers/userGameController';
const router = express.Router();

// GET
router.get('/', generalController.homeRoute);
router.get('/user', userController.readUser);
router.get('/user/:id', userController.readUser);
router.get('/game', gameController.readGame);
router.get('/game/:id', gameController.readGame);
router.get('/usergame', userGameController.readUserGame);
router.get('/usergame/:id', userGameController.readUserGame);
router.get('/db', generalController.dbRoute);

// POST
router.post('/login', loginController.loginAuth);
router.post('/user', userController.createUser);
router.post('/usergame', userGameController.createUserGame);

// PUT
router.put('/user/:id', userController.updateUser);
router.put('/usergame/:id', userGameController.updateUserGame);

// DELETE
router.delete('/user/:id', userController.deleteUser);
router.delete('/usergame/:id', userGameController.deleteUserGame);

export default router;