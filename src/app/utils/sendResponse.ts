import { Response } from 'express';

type XResponse<X> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: X;
};

const sendResponse = <X>(res: Response, data: XResponse<X>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
