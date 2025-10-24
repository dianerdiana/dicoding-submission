import { ServerRoute } from '@hapi/hapi';
import { UserHandler } from './auth.handler';

export class UserRoute {
  private userHandler: UserHandler;

  constructor(userHandler: UserHandler) {
    this.userHandler = userHandler;
  }

  public routes(): ServerRoute[] {
    return [
      {
        method: 'POST',
        path: '/users',
        handler: this.userHandler.createUser,
      },
      {
        method: 'GET',
        path: '/users/{id}',
        handler: this.userHandler.getUserById,
      },
      {
        method: 'DELETE',
        path: '/users/{id}',
        handler: this.userHandler.deleteUser,
      },
    ];
  }
}
