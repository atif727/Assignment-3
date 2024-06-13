import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { carServices } from './cars.service';
import sendResponse from '../../utils/sendResponse';

// made it get all cars or get cars through query params
const getAllOrQueryCars: RequestHandler = catchAsync(async (req, res) => {
  console.log(req.query.name);
  const result = await carServices.getAllOrQueryCarsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cars retrieved succesfully',
    data: result,
  });
});

const createCar: RequestHandler = catchAsync(async (req, res) => {
  const result = await carServices.createCarInDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car created succesfully',
    data: result,
  });
});

const findCarById: RequestHandler = catchAsync(async (req, res) => {
  const result = await carServices.getCarById(req.params._id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'A Car retrieved  succesfully',
    data: result,
  });
});

export const carsController = {
  getAllOrQueryCars,
  createCar,
  findCarById
};
