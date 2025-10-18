import { ResponseToolkit, ResponseObject } from '@hapi/hapi';

export const successResponse = (res: ResponseToolkit, data: any, code = 200): ResponseObject => {
  return res
    .response({
      status: 'success',
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
      status: 'error',
      message,
    })
    .code(code);
};
