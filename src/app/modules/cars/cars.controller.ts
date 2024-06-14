import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { carServices } from './cars.service';
import sendResponse from '../../utils/sendResponse';
import { Xcars } from './cars.interface';
import { noDataFound } from '../../errors/noDataFoundError';

// made it get all cars or get cars through query params
const getAllOrQueryCars: RequestHandler = catchAsync(async (req, res) => {
  console.log(req.query.name);
  const result = await carServices.getAllOrQueryCarsFromDB(req.query);
  if (result.length === 0) {
    noDataFound(res);
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cars retrieved succesfully',
    data: result,
  });
});

const createCar: RequestHandler = catchAsync(async (req, res) => {
  const body: Xcars = req.body;
  const result = await carServices.createCarInDB(body);
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

const updateCarById: RequestHandler = catchAsync(async (req, res) => {
  const result = await carServices.updateCarById(req.params._id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'A Car Updated succesfully',
    data: result,
  });
});

export const carsController = {
  getAllOrQueryCars,
  createCar,
  findCarById,
  updateCarById,
};
