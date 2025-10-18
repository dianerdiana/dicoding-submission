import BookRepository from './book.repository';
import { CreateBookPayload, UpdateBookPayload } from './book.schema';
import { Book } from './book.entity';

export default class BookService {
  private bookRepository = new BookRepository();

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async createBook(payload: CreateBookPayload) {
    const newBook = new Book(payload);
    this.bookRepository.create(newBook);

    return newBook.id;
  }

  async getAllBooks() {
    const books = await this.bookRepository.findAll();
    return books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
  }

  async getBookById(id: string) {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      return null;
    }

    return book;
  }

  async updateBook(bookData: Book, payload: UpdateBookPayload) {
    bookData.update(payload);
    await this.bookRepository.update(bookData);

    return bookData;
  }

  async deleteBook(bookId: string) {
    await this.bookRepository.delete(bookId);

    return true;
  }
}
