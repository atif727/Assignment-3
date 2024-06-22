import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { userModel } from '../users/user.model';
import { createToken } from '../../utils/auth.utils';
import config from '../../config/config';

const signIn = async (payload: XloginUser) => {
  const userWithPass = await userModel
    .findOne({ email: payload.email })
    .select('+password');
  if (!userWithPass) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  if (userWithPass.password != payload.password) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }
  const user = await userModel.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const jwtpayload = { email: user.email, role: user.role };
  const token = createToken(
    jwtpayload,
    config.jwt_access_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  const result = { user, token };
  return result;
};

export const authServices = { signIn };
