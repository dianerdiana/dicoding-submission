import z from 'zod';
import Boom from '@hapi/boom';
import { ResponseToolkit, ResponseObject } from '@hapi/hapi';
import { AppError } from '../../shared/errors/app-error';

interface HandleErrorOptions {
  res: ResponseToolkit;
  error: unknown;
  fallbackCode?: number;
}

/**
 * handleError (universal)
 * Bisa mendeteksi error dari Zod, AppError, Boom, maupun native Error.
 */
export const handleError = ({
  res,
  error,
  fallbackCode = 500,
}: HandleErrorOptions): ResponseObject => {
  // 1️⃣ Zod validation error
  if (error instanceof z.ZodError) {
    console.error(error);
    const message = error.issues[0]?.message || 'Validasi input gagal';
    return res.response({ status: 'fail', message }).code(400);
  }

  // 2️⃣ Custom AppError
  if (error instanceof AppError) {
    console.error(error);
    return res
      .response({
        status: error.status,
        message: error.message,
      })
      .code(error.statusCode);
  }

  // 3️⃣ Boom error (bawaan Hapi)
  if (Boom.isBoom(error)) {
    console.error(error);
    const { output, message } = error;
    return res
      .response({
        message: message || output.payload.message || 'Terjadi kesalahan',
        status: 'error',
      })
      .code(output.statusCode);
  }

  // 4️⃣ Native Error
  if (error instanceof Error) {
    console.error(error);
    return res
      .response({
        res,
        message: error.message || 'Terjadi kesalahan pada server',
        code: fallbackCode,
      })
      .code(fallbackCode);
  }

  // 5️⃣ Unknown error
  return res
    .response({
      res,
      message: 'Server Error',
      status: 'error',
    })
    .code(fallbackCode);
};
