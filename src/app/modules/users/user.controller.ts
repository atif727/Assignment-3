import { RequestHandler } from 'express';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { xUserInterface } from './user.interface';
import catchAsync from '../../utils/catchAsync';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  // taking body of the request
  const body: xUserInterface = req.body;
  const result = await userService.createUserInDB(body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `User registered successfully`,
    data: result,
  });
});

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  // getting all user for dev purposes
  const result = await userService.getAllUsersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Users shown successfully`,
    data: result,
  });
});
export const userController = {
  createUser,
  getAllUsers,
};
