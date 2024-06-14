/* eslint-disable @typescript-eslint/no-explicit-any */
import { XErrorSources, XGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): XGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSources: XErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid Request',
    errorSources,
  };
};

export default handleDuplicateError;
