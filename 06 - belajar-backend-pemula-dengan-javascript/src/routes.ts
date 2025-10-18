import { ServerRoute } from '@hapi/hapi';
import { bookRoutes } from './modules/books/book.routes';

export const routes: ServerRoute[] = [...bookRoutes];
