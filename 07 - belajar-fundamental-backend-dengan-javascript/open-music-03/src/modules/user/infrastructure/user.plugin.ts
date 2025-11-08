import { Plugin } from '@hapi/hapi';
import { UserRepository } from './user.repository';
import { CreateUserUseCase } from '../application/use-case/create-user.use-case';
import { UserHandler } from '../interface/http/user.handler';
import { UserRoute } from '../interface/http/user.route';
import { SignInUserUseCase } from '../application/use-case/sign-in-user.use-case';
import { serviceContainer } from '../../../shared/utils/service-container';
import { SERVICE_KEYS } from '../../../shared/constants/service-keys.constant';
import { GetUserByIdsUseCase } from '../application/use-case/get-user-by-id.use-case';

export const userPlugin: Plugin<undefined> = {
  name: 'users',
  version: '1.0.0',
  register: async (server) => {
    const userRepository = new UserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const getUserByUsername = new SignInUserUseCase(userRepository);
    const getUserByIdsUseCase = new GetUserByIdsUseCase(userRepository);
    const userHandler = new UserHandler(createUserUseCase);

    serviceContainer.register(SERVICE_KEYS.SIGN_IN_USER_USE_CASE, getUserByUsername);
    serviceContainer.register(SERVICE_KEYS.GET_USER_BY_IDS_USE_CASE, getUserByIdsUseCase);
    server.route(new UserRoute(userHandler).routes());
  },
};
