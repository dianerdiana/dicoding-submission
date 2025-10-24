import { Plugin } from '@hapi/hapi';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthHandler } from './auth.handler';
import { AuthRoute } from './auth.route';
import { serviceContainer } from '../../common/ServiceContainer';

export const authPlugin: Plugin<undefined> = {
  name: 'auths',
  version: '1.0.0',
  register: async (server) => {
    const authRepository = new AuthRepository();
    const authService = new AuthService(authRepository);
    const authHandler = new AuthHandler(authService);
    const authRoute = new AuthRoute(authHandler);

    serviceContainer.register('AuthService', authService);
    server.route(authRoute.routes());
  },
};
