import { ErrorRequestHandler } from 'express';
import { API_ERROR } from './common/helpers/throwApiError';
import { StatusCodes } from 'http-status-codes';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof API_ERROR) {
    return res.status(err.code).json({ message: err.message });
  }

  console.log(err);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: err.message });
};

export default errorHandler;
