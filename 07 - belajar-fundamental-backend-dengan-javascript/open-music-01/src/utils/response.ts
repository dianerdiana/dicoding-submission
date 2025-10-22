import { ResponseToolkit, ResponseObject } from '@hapi/hapi';

export const successResponse = ({
  res,
  data,
  message,
  code = 200,
  status = 'success',
}: {
  res: ResponseToolkit;
  data?: any;
  message?: string;
  code?: number;
  status?: string;
}): ResponseObject => {
  return res
    .response({
      status,
      message,
      data,
    })
    .code(code);
};

export const errorResponse = ({
  res,
  message,
  code = 404,
  status = 'fail',
}: {
  res: ResponseToolkit;
  message?: string;
  code?: number;
  status?: string;
}): ResponseObject => {
  return res
    .response({
      status,
      message,
    })
    .code(code);
};
