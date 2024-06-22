import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { authServices } from './auth.service';

const LoginUser: RequestHandler = catchAsync(async (req, res) => {
  // user logging in
  const result = await authServices.signIn(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `User logged in successfully`,
    data: result,
  });
});

export const authController = { LoginUser };
