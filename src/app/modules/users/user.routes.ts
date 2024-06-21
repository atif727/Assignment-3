import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { UserSchema } from './user.validation';
import { authController } from '../auth/auth.controller';
import auth from '../../middlewares/authentication';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post('/signup', validateRequest(UserSchema), userController.createUser);
router.post('/signin', authController.LoginUser);
// using this for dev work purposes
router.get('/users', auth(USER_ROLE.admin), userController.getAllUsers);

export const userRoutes = router;
