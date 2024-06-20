import { RequestHandler } from 'express';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { xUserInterface } from './user.interface';
import catchAsync from '../../utils/catchAsync';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const body: xUserInterface = req.body;
  const result = await userService.createUserInDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `User created successfully`,
    data: result,
  });
});

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
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
