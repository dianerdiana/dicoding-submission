import { Plugin } from '@hapi/hapi';
import { UserRepository } from './user.repository';
import { CreateUserUseCase } from '../application/use-case/create-user.use-case';
import { UserHandler } from '../interface/http/user.handler';
import { UserRoute } from '../interface/http/user.route';

export const userPlugin: Plugin<undefined> = {
  name: 'users',
  version: '1.0.0',
  register: async (server) => {
    const userRepository = new UserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const userHandler = new UserHandler(createUserUseCase);

    server.route(new UserRoute(userHandler).routes());
  },
};
