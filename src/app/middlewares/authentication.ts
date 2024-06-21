import { NextFunction, Request, Response } from 'express';
import { XUserRole } from '../modules/users/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { userModel } from '../modules/users/user.model';
import config from '../config/config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRoles: XUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    // token checking
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    const token = authHeader.split(' ')[1];
    // decoding the token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    // checking if the user exists
    const user = await userModel.findOne({ email: email });
    if (!user || user === null) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    // main authentication
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // added this as JwtPayload just to be secure
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
