import BookService from './book.service';
import type { HapiHandler } from '../../types/hapi';
import { ResponseObject } from '@hapi/hapi';
import { errorResponse, successResponse } from '../../utils/response';
import { CreateBookPayload } from './book.schema';
import z from 'zod';

export default class BookHandler {
  private bookService = new BookService();

  createBook: HapiHandler = async (req, res): Promise<ResponseObject> => {
    try {
      const payload = req.payload as CreateBookPayload;
      const response = await this.bookService.createBook(payload);

      return successResponse(res, response, 'Buku berhasil ditambahkan', 201);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return errorResponse(res, error.issues[0].message, 400);
      }

      if (error instanceof Error) {
        return errorResponse(res, error.message, 400);
      }

      return errorResponse(res, 'Server Error', 500);
    }
  };
}
