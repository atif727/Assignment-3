import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { authServices } from './auth.service';

const LoginUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await authServices.signIn(req.body);
  console.log(result);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Users shown successfully`,
    data: result,
  });
});

export const authController = { LoginUser };
