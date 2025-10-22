import { Book } from './book.entity';

export default class BookRepository {
  private books: Book[] = [];

  async create(book: Book): Promise<void> {
    this.books.push(book);
  }

  async findAll({
    name,
    reading,
    finished,
  }: {
    name?: string;
    reading?: boolean;
    finished?: boolean;
  }): Promise<Book[]> {
    let books = this.books;

    if (name !== undefined) {
      books = this.books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (reading !== undefined) {
      books = this.books.filter((book) => book.reading === reading);
    }

    if (finished !== undefined) {
      books = this.books.filter((book) => book.finished === finished);
    }

    return books;
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
