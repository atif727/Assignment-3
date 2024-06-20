import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { UserSchema } from './user.validation';

const router = express.Router();

router.post('/signup', validateRequest(UserSchema),userController.createUser);
router.post('/signin');
router.get('/users', userController.getAllUsers);

export const userRoutes = router;
