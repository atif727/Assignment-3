import { ZodError, ZodIssue } from 'zod';
import { XErrorSources, XGenericErrorResponse } from '../interface/error';
// Zod error handler
const handleZodError = (err: ZodError): XGenericErrorResponse => {
  const errorSources: XErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
