import { Router } from "express";
import  UserController  from '../controllers/user.controller';
export const router = Router();

router.post('/user',UserController.createUser)
        .get('/user',UserController.getUsers)
        .get('/user/leaderboard',UserController.getLeaderboard)
        .get('/user/:id',UserController.getSingleUser)
        .patch('/user/:id',UserController.updateUser)
        .delete('/user/:id',UserController.deleteUser)