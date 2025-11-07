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
        handler: this.authHandler.signIn,
      },
      {
        method: 'PUT',
        path: '/authentications',
        handler: this.authHandler.refreshToken,
      },
      {
        method: 'DELETE',
        path: '/authentications',
        handler: this.authHandler.deleteAuth,
      },
    ];
  }
}
