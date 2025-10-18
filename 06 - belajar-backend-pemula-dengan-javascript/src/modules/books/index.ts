import BookHandler from './book.handler';
import BookRepository from './book.repository';
import BookRoute from './book.route';
import BookService from './book.service';

const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);
const bookHandler = new BookHandler(bookService);
const bookRoute = new BookRoute(bookHandler);

const bookRoutes = bookRoute.routes();

export { bookRoutes, bookService };
