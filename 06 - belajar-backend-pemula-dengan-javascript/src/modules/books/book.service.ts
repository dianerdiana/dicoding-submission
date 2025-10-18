import { z } from 'zod';
import BookRepository from './book.repository';
import { CreateBookPayload, createBookSchema } from './book.schema';
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
}
