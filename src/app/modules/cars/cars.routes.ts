import express from 'express';
import { carsController } from './cars.controller';
import validateRequest from '../../middlewares/validateRequest';
import { carValidation } from './cars.validation';

const router = express.Router();

router.get('/', carsController.getAllOrQueryCars);
router.post('/', validateRequest(carValidation.carValidationSchema),carsController.createCar);
router.get('/:_id', carsController.findCarById);
router.put('/:_id', carsController.updateCarById);

export const carRoutes = router;
