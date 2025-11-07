import { ServerRoute } from '@hapi/hapi';
import { UserHandler } from './user.handler';

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
    ];
  }
}
