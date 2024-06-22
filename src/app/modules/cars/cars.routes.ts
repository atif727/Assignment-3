import express from 'express';
import { carsController } from './cars.controller';
import validateRequest from '../../middlewares/validateRequest';
import { carValidation } from './cars.validation';
import { bookingController } from '../bookings/bookings.controller';
import auth from '../../middlewares/authentication';

const router = express.Router();

router.put('/return', auth('admin'), bookingController.returnBooking);
router.get('/', carsController.getAllOrQueryCars);
router.post(
  '/',
  auth('admin'),
  validateRequest(carValidation.carValidationSchema),
  carsController.createCar,
);
router.get('/:_id', carsController.findCarById);
router.put(
  '/:_id',
  auth('admin'),
  validateRequest(carValidation.carUpdateValidationSchema),
  carsController.updateCarById,
);

router.delete('/:_id', carsController.deleteCarById);

// return booking handler of admin

export const carRoutes = router;
