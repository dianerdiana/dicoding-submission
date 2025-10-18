import BookService from './book.service';
import type { HapiHandler } from '../../types/hapi';
import { ResponseObject } from '@hapi/hapi';
import { errorResponse, successResponse } from '../../utils/response';
import { CreateBookPayload, UpdateBookPayload } from './book.schema';
import z from 'zod';

export default class BookHandler {
  private bookService = new BookService();

  createBook: HapiHandler = async (req, res): Promise<ResponseObject> => {
    try {
      const payload = req.payload as CreateBookPayload;
      const response = await this.bookService.createBook(payload);

      return successResponse({
        res,
        data: response,
        message: 'Buku berhasil ditambahkan',
        code: 201,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return errorResponse({ res, message: error.issues[0].message, code: 400 });
      }

      if (error instanceof Error) {
        return errorResponse({ res, message: error.message, code: 400 });
      }

      return errorResponse({ res, message: 'Server Error', code: 500 });
    }
  };

  getAllBooks: HapiHandler = async (req, res): Promise<ResponseObject> => {
    try {
      const books = await this.bookService.getAllBooks();
      return successResponse({ res, data: books });
    } catch (error) {
      if (error instanceof Error) {
        return errorResponse({ res, message: error.message, code: 400 });
      }

      return errorResponse({ res, message: 'Server Error', code: 500 });
    }
  };

  getBookById: HapiHandler = async (req, res): Promise<ResponseObject> => {
    try {
      const bookId = req.params.bookId;

      if (!bookId) {
        return errorResponse({ res, message: 'Buku tidak ditemukan', code: 404 });
      }

      const book = await this.bookService.getBookById(bookId);
      return successResponse({ res, data: book });
    } catch (error) {
      if (error instanceof Error) {
        return errorResponse({ res, message: error.message, code: 400 });
      }

      return errorResponse({ res, message: 'Server Error', code: 500 });
    }
  };

  updateBook: HapiHandler = async (req, res): Promise<ResponseObject> => {
    try {
      const bookId = req.params.bookId;
      const payload = req.payload as UpdateBookPayload;

      if (!bookId) {
        return errorResponse({
          res,
          message: 'Gagal memperbarui buku. Id tidak ditemukan',
          code: 404,
        });
      }

      await this.bookService.updateBook(bookId, payload);

      return successResponse({ res, message: 'Buku berhasil diperbarui' });
    } catch (error) {
      if (error instanceof Error) {
        return errorResponse({ res, message: error.message, code: 400 });
      }

      return errorResponse({ res, message: 'Server Error', code: 500 });
    }
  };

  deleteBook: HapiHandler = async (req, res): Promise<ResponseObject> => {
    try {
      const bookId = req.params.bookId;

      if (!bookId) {
        return errorResponse({
          res,
          message: 'Buku gagal dihapus. Id tidak ditemukan',
          code: 404,
        });
      }

      await this.bookService.deleteBook(bookId);

      return successResponse({ res, message: 'Buku berhasil dihapus' });
    } catch (error) {
      if (error instanceof Error) {
        return errorResponse({ res, message: error.message, code: 400 });
      }

      return errorResponse({ res, message: 'Server Error', code: 500 });
    }
  };
}
