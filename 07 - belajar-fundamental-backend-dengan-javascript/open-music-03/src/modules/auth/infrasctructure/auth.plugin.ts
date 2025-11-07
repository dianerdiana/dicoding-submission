import { Plugin } from '@hapi/hapi';
import { serviceContainer } from '../../../shared/utils/service-container';
import { SERVICE_KEYS } from '../../../shared/constants/service-keys.constant';
import { JwtService } from './security/jwt.service';
import { PasswordService } from './security/password.service';
import { AuthRepository } from './auth.repository';
import { SignInUseCase } from '../application/use-case/signin.use-case';
import { RefreshTokenUseCase } from '../application/use-case/refresh-token.use-case';
import { DeleteAuthUseCase } from '../application/use-case/delete-auth.use-case';
import { AuthHandler } from '../interface/http/auth.handler';
import { AuthRoute } from '../interface/http/auth.route';

export const authPlugin: Plugin<undefined> = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server) => {
    const jwtService = new JwtService();
    const passwordService = new PasswordService();
    const authRepository = new AuthRepository();
    const signInUseCase = new SignInUseCase(jwtService, authRepository);
    const refreshTokenUseCase = new RefreshTokenUseCase(jwtService, authRepository);
    const deleteTokenUseCase = new DeleteAuthUseCase(jwtService, authRepository);
    const authHandler = new AuthHandler(signInUseCase, refreshTokenUseCase, deleteTokenUseCase);

    serviceContainer.register(SERVICE_KEYS.JWT_SERVICE, jwtService);
    serviceContainer.register(SERVICE_KEYS.PASSWORD_SERVICE, passwordService);

    server.route(new AuthRoute(authHandler).routes());
  },
};
