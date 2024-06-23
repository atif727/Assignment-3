import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { userModel } from '../users/user.model';
import { createToken } from '../../utils/auth.utils';
import config from '../../config/config';

const signIn = async (payload: XloginUser) => {
  // getting user with password
  const userWithPass = await userModel
    .findOne({ email: payload.email })
    .select('+password'); // this is what i used to get the password for password verification
  // checking if user is found
  if (!userWithPass || userWithPass === null || userWithPass === undefined) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  } // checking if password is correct
  else if (userWithPass.password != payload.password) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  } else {
    // getting user without password
    const user = await userModel.findOne({ email: payload.email });
    if (!user || user === null || user === undefined) {
      // just to be extra secure
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    } else {
      // putting jwtpayload information and creating a token
      const jwtpayload = { email: user.email, role: user.role };
      const token = createToken(
        jwtpayload,
        config.jwt_access_secret as string,
        config.jwt_refresh_expires_in as string
      );
      // not putting any refresh token generetor as this is a practice project/assignment
      // returning user with no password shown and token
      const result = { user, token };
      return result;
    }
  }
};

export const authServices = { signIn };
