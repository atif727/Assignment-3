import httpStatus from 'http-status';
import sendResponse from '../utils/sendResponse';
import { Response } from 'express';
// zod error handler
export const noDataFound = async (res: Response) => {
  return sendResponse(res, {
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: 'No Data Found',
    data: "No Data",
  });
};
