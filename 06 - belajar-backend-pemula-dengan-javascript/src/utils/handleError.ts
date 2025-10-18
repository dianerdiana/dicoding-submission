import z from 'zod';
import { ResponseToolkit, ResponseObject } from '@hapi/hapi';
import { errorResponse } from './response';
import { AppError } from '../common/AppError';

interface HandleErrorOptions {
  res: ResponseToolkit;
  error: unknown;
  fallbackCode?: number;
}

/**
 * handleError (advanced)
 * Menangani berbagai jenis error secara konsisten di seluruh aplikasi.
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

  // 2️⃣ Custom AppError (termasuk turunannya)
  if (error instanceof AppError) {
    return errorResponse({ res, message: error.message, code: error.statusCode });
  }

  // 3️⃣ JavaScript native error (default)
  if (error instanceof Error) {
    return errorResponse({
      res,
      message: error.message || 'Terjadi kesalahan pada server',
      code: fallbackCode,
    });
  }

  // 4️⃣ Fallback error (unknown type)
  return errorResponse({ res, message: 'Server Error', code: fallbackCode });
};
