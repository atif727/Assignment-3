import express from 'express';
import { bookingController } from './bookings.controller';
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidation } from './bookings.validation';

const router = express.Router();

router.get('/', bookingController.getAllBookings);
router.post('/',validateRequest(bookingValidation), bookingController.bookACar);
router.get('/my-bookings', bookingController.getMyBookings);

export const bookingRoutes = router;
