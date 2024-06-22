import express from 'express';
import { carsController } from './cars.controller';
import validateRequest from '../../middlewares/validateRequest';
import { carValidation } from './cars.validation';
import { bookingController } from '../bookings/bookings.controller';
import auth from '../../middlewares/authentication';

const router = express.Router();

// return booking handler of admin
router.put(
  '/return',
  auth('admin'),
  validateRequest(carValidation.returnValidationSchema),
  bookingController.returnBooking,
);
router.get('/', carsController.getAllOrQueryCars);
router.get('/:_id', carsController.findCarById);
router.post(
  '/',
  auth('admin'),
  validateRequest(carValidation.carValidationSchema),
  carsController.createCar,
);
router.put(
  '/:_id',
  auth('admin'),
  validateRequest(carValidation.carUpdateValidationSchema),
  carsController.updateCarById,
);

// soft delete
router.delete('/:_id', auth('admin'), carsController.deleteCarById);

export const carRoutes = router;
