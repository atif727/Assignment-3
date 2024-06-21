import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { noDataFound } from '../../errors/noDataFoundError';
import { bookingServices } from './bookings.service';
import { USER_ROLE } from '../users/user.constant';

const getAllBookings: RequestHandler = catchAsync(async (req, res) => {
  console.log(req.query.name);
  const result = await bookingServices.getAllBookingsInDB();
  if (result.length === 0) {
    noDataFound(res);
  }
  console.log(USER_ROLE.admin)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved succesfully',
    data: result,
  });
});

const bookACar: RequestHandler = catchAsync(async (req, res) => {
  const { carId, date, startTime } = req.body;
  const result = await bookingServices.bookingACarInDB(carId, date, startTime);
  if (result === null) {
    noDataFound(res);
  }
  if (result === 'Car is not available') {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: 'Car is not available',
      data: result,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car booked successfully',
    data: result,
  });
});

const getMyBookings: RequestHandler = catchAsync(async (req, res) => {
  const result = await bookingServices.gettingMyBookings();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved succesfully',
    data: result,
  });
});

// return booking handler of admin
const returnBooking: RequestHandler = catchAsync(async (req, res) => {
  const { bookingId, endTime } = req.body;
  const result = await bookingServices.returnCar(bookingId, endTime);
  if (result === null) {
    noDataFound(res);
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved succesfully',
    data: result,
  });
});

export const bookingController = {
  getAllBookings,
  bookACar,
  getMyBookings,
  returnBooking,
};
