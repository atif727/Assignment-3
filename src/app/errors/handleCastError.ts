import mongoose from 'mongoose';
import { XErrorSources, XGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): XGenericErrorResponse => {
  const errorSources: XErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Cast Error, wrong request',
    errorSources,
  };
};

export default handleCastError;
