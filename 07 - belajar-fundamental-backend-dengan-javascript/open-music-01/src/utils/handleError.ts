import z from 'zod';
import Boom from '@hapi/boom';
import { ResponseToolkit, ResponseObject } from '@hapi/hapi';
import { errorResponse } from './response';
import { AppError } from '../common/AppError';

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
    const message = error.issues[0]?.message || 'Validasi input gagal';
    return errorResponse({ res, message, code: 400 });
  }

  // 2️⃣ Custom AppError
  if (error instanceof AppError) {
    return errorResponse({
      res,
      message: error.message,
      code: error.statusCode,
    });
  }

  // 3️⃣ Boom error (bawaan Hapi)
  if (Boom.isBoom(error)) {
    const { output, message } = error;
    return errorResponse({
      res,
      message: message || output.payload.message || 'Terjadi kesalahan',
      code: output.statusCode,
    });
  }

  // 4️⃣ Native Error
  if (error instanceof Error) {
    return errorResponse({
      res,
      message: error.message || 'Terjadi kesalahan pada server',
      code: fallbackCode,
    });
  }

  // 5️⃣ Unknown error
  return errorResponse({
    res,
    message: 'Server Error',
    code: fallbackCode,
  });
};
