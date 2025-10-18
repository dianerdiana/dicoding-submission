import { Book } from './book.entity';

export default class BookRepository {
  private books: Book[] = [];

  async create(book: Book): Promise<void> {
    this.books.push(book);
  }

  async findAll(): Promise<Book[]> {
    return this.books;
  }

  async findById(id: string): Promise<Book | null> {
    return this.books.find((b) => b.id === id) ?? null;
  }

  async update(book: Book): Promise<void> {
    const index = this.books.findIndex((b) => b.id === book.id);
    if (index !== -1) this.books[index] = book;
  }

  async delete(id: string): Promise<void> {
    this.books = this.books.filter((b) => b.id !== id);
  }
}
