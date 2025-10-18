import { ResponseToolkit, ResponseObject } from '@hapi/hapi';

export const successResponse = ({
  res,
  data,
  message,
  code = 200,
}: {
  res: ResponseToolkit;
  data?: any;
  message?: string;
  code?: number;
}): ResponseObject => {
  return res
    .response({
      status: 'success',
      message,
      data,
    })
    .code(code);
};

export const errorResponse = ({
  res,
  message,
  code = 404,
}: {
  res: ResponseToolkit;
  message?: string;
  code?: number;
}): ResponseObject => {
  return res
    .response({
      status: 'fail',
      message,
    })
    .code(code);
};
