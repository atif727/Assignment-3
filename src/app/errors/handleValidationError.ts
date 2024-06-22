import mongoose from 'mongoose';
import { XErrorSources, XGenericErrorResponse } from '../interface/error';
//  validation error handler
const handleValidationError = (
  err: mongoose.Error.ValidationError,
): XGenericErrorResponse => {
  const errorSources: XErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
