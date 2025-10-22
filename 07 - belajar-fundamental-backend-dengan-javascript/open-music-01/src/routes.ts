import { ServerRoute } from '@hapi/hapi';
import { bookRoutes } from './modules/books';

export const routes: ServerRoute[] = [...bookRoutes];
