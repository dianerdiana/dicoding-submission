import { ServerRoute } from '@hapi/hapi';
import { AuthHandler } from './auth.handler';

export class AuthRoute {
  private authHandler: AuthHandler;

  constructor(authHandler: AuthHandler) {
    this.authHandler = authHandler;
  }

  public routes(): ServerRoute[] {
    return [
      {
        method: 'POST',
        path: '/authentications',
        handler: this.authHandler.login,
      },
      {
        method: 'PUT',
        path: '/authentications',
        handler: this.authHandler.updateAccessToken,
      },
      {
        method: 'DELETE',
        path: '/authentications',
        handler: this.authHandler.deleteRefreshToken,
      },
    ];
  }
}
