import { Plugin } from '@hapi/hapi';
import { UserRepository } from './auth.repository';
import { UserService } from './auth.service';
import { UserHandler } from './auth.handler';
import { UserRoute } from './auth.route';
import { serviceContainer } from '../../common/ServiceContainer';

export const userPlugin: Plugin<undefined> = {
  name: 'users',
  version: '1.0.0',
  register: async (server) => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const userHandler = new UserHandler(userService);
    const userRoute = new UserRoute(userHandler);

    serviceContainer.register('UserService', userService);
    server.route(userRoute.routes());
  },
};
