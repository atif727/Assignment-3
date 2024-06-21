import express from 'express';
import { bookingController } from './bookings.controller';
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidation } from './bookings.validation';
import auth from '../../middlewares/authentication';
import { USER_ROLE } from '../users/user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), bookingController.getAllBookings);
router.post(
  '/',
  validateRequest(bookingValidation),
  bookingController.bookACar,
);
router.get('/my-bookings', bookingController.getMyBookings);

export const bookingRoutes = router;
