import BookService from './book.service';
import type { HapiHandler } from '../../types/hapi';
import { ResponseObject } from '@hapi/hapi';
import { successResponse } from '../../utils/response';
import {
  CreateBookPayload,
  createBookSchema,
  UpdateBookPayload,
  updateBookSchema,
} from './book.schema';
import { handleError } from '../../utils/handleError';
import { NotFoundError } from '../../common/AppError';

export default class BookHandler {
  private bookService = new BookService();

  createBook: HapiHandler = async (req, res): Promise<ResponseObject> => {
    try {
      const payload = req.payload as CreateBookPayload;
      await createBookSchema.parseAsync(payload);
      const bookId = await this.bookService.createBook(payload);

      return successResponse({
        res,
        data: { bookId },
        message: 'Buku berhasil ditambahkan',
        code: 201,
      });
    } catch (error) {
      return handleError({ res, error });
    }
  };

  getAllBooks: HapiHandler = async (req, res): Promise<ResponseObject> => {
    try {
      const books = await this.bookService.getAllBooks();
      return successResponse({ res, data: { books } });
    } catch (error) {
      return handleError({ res, error });
    }
  };

  getBookById: HapiHandler = async (req, res): Promise<ResponseObject> => {
    try {
      const { bookId } = req.params;
      if (!bookId) throw new NotFoundError('Buku tidak ditemukan');

      const book = await this.bookService.getBookById(bookId);
      if (!book) throw new NotFoundError('Buku tidak ditemukan');

      return successResponse({ res, data: { book } });
    } catch (error) {
      return handleError({ res, error });
    }
  };

  updateBook: HapiHandler = async (req, res): Promise<ResponseObject> => {
    try {
      const { bookId } = req.params;
      const payload = req.payload as UpdateBookPayload;
      if (!bookId) throw new NotFoundError('Gagal memperbarui buku. Id tidak ditemukan');

      await updateBookSchema.parseAsync(payload);

      const book = await this.bookService.getBookById(bookId);
      if (!book) throw new NotFoundError('Gagal memperbarui buku. Id tidak ditemukan');

      const updatedBook = await this.bookService.updateBook(book, payload);

      return successResponse({
        res,
        message: 'Buku berhasil diperbarui',
        data: { book: updatedBook },
      });
    } catch (error) {
      return handleError({ res, error });
    }
  };

  deleteBook: HapiHandler = async (req, res): Promise<ResponseObject> => {
    try {
      const { bookId } = req.params;
      if (!bookId) throw new NotFoundError('Buku gagal dihapus. Id tidak ditemukan');

      const book = await this.bookService.getBookById(bookId);
      if (!book) throw new NotFoundError('Buku gagal dihapus. Id tidak ditemukan');

      await this.bookService.deleteBook(bookId);

      return successResponse({ res, message: 'Buku berhasil dihapus' });
    } catch (error) {
      return handleError({ res, error });
    }
  };
}
