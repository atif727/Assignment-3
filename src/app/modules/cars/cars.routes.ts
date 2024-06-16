import express from 'express';
import { carsController } from './cars.controller';
import validateRequest from '../../middlewares/validateRequest';
import { carValidation } from './cars.validation';
import { bookingController } from '../bookings/bookings.controller';

const router = express.Router();

router.put("/return", bookingController.returnBooking)
router.get('/', carsController.getAllOrQueryCars);
router.post(
  '/',
  validateRequest(carValidation.carValidationSchema),
  carsController.createCar,
);
router.get('/:_id', carsController.findCarById);
router.put(
  '/:_id',
  validateRequest(carValidation.carUpdateValidationSchema),
  carsController.updateCarById,
);

// return booking handler of admin

export const carRoutes = router;
