import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { bookingServices } from './bookings.service';
import AppError from '../../errors/AppError';

const getAllBookings: RequestHandler = catchAsync(async (req, res) => {  
  const result = await bookingServices.getAllBookingsInDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved succesfully',
    data: result,
  });
});

const bookACar: RequestHandler = catchAsync(async (req, res) => {
  // taking all the required data from the body of the given request
  const { carId, date, startTime } = req.body;
  // taking user's email
  const { email } = req.user;
  const result = await bookingServices.bookingACarInDB(
    carId,
    date,
    startTime,
    email
  );
  if (result === null) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car booked successfully',
    data: result,
  });
});

const getMyBookings: RequestHandler = catchAsync(async (req, res) => {
  // taking the user's email
  const user = req.user;
  const email: string = user.email;
  const result = await bookingServices.gettingMyBookings(email);
  if (result === null || result === undefined) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved succesfully',
    data: result,
  });
});

// return booking handler of admin
const returnBooking: RequestHandler = catchAsync(async (req, res) => {
  // taking all the required data from the body of the given request
  const { bookingId, endTime } = req.body;
  const result = await bookingServices.returnCar(bookingId, endTime);
  if (result === null || result === undefined) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  } else {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Bookings retrieved succesfully',
      data: result,
    });
  }
});

export const bookingController = {
  getAllBookings,
  bookACar,
  getMyBookings,
  returnBooking,
};
