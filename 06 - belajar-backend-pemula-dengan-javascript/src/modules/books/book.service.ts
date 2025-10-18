import { z } from 'zod';
import BookRepository from './book.repository';
import { CreateBookPayload, createBookSchema, UpdateBookPayload } from './book.schema';
import { Book } from './book.entity';

export default class BookService {
  private bookRepository = new BookRepository();

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async createBook(payload: CreateBookPayload) {
    await createBookSchema.parseAsync(payload);

    const newBook = new Book(payload);
    this.bookRepository.create(newBook);

    return { bookId: newBook.id };
  }

  async getAllBooks() {
    const books = await this.bookRepository.findAll();
    return {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    };
  }

  async getBookById(id: string) {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new Error('Buku tidak ditemukan');
    }

    return { book };
  }

  async updateBook(bookId: string, payload: UpdateBookPayload) {
    let book = await this.bookRepository.findById(bookId);

    if (!book) {
      throw new Error('Gagal memperbarui buku. Buku tidak ditemukan');
    }

    book = new Book(book);
    book.update(payload);

    this.bookRepository.update(book);

    return true;
  }

  async deleteBook(bookId: string) {
    await this.bookRepository.delete(bookId);

    return true;
  }
}
