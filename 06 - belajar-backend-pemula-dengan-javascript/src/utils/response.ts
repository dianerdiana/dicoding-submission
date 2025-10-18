import { ResponseToolkit, ResponseObject } from '@hapi/hapi';

export const successResponse = (
  res: ResponseToolkit,
  data: any,
  message: string = 'Success',
  code = 200,
): ResponseObject => {
  return res
    .response({
      status: 'success',
      message,
      data,
    })
    .code(code);
};

export const errorResponse = (
  res: ResponseToolkit,
  message: string,
  code = 400,
): ResponseObject => {
  return res
    .response({
      status: 'fail',
      message,
    })
    .code(code);
};
