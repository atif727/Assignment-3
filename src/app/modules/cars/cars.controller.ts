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

export const carsController = {
  getAllOrQueryCars,
};
