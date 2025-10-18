import { ServerRoute } from '@hapi/hapi';
import BookHandler from './book.handler';

export default class BookRoute {
  private handler = new BookHandler();

  public routes(): ServerRoute[] {
    return [
      {
        method: 'POST',
        path: '/books',
        handler: this.handler.createBook,
      },
      {
        method: 'GET',
        path: '/books',
        handler: this.handler.getAllBooks,
      },
      {
        method: 'GET',
        path: '/books/{bookId}',
        handler: this.handler.getBookById,
      },
      {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: this.handler.updateBook,
      },
      {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: this.handler.deleteBook,
      },
    ];
  }
}
