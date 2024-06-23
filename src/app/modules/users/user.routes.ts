import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { UserSchema } from './user.validation';
import { authController } from '../auth/auth.controller';
import auth from '../../middlewares/authentication';
import { USER_ROLE } from './user.constant';
import { UserLoginSchema } from '../auth/auth.validation';

const router = express.Router();

// signing up for the first time
router.post('/signup', validateRequest(UserSchema), userController.createUser);
// signing in
router.post(
  '/signin',
  validateRequest(UserLoginSchema),
  authController.LoginUser,
);
// using this for dev work purposes
// confidential route so made it admin only
router.get('/users', auth("admin"), userController.getAllUsers);

export const userRoutes = router;
