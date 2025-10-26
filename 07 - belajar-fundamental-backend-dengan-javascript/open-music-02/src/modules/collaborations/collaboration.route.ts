import { ServerRoute } from '@hapi/hapi';
import { CollaborationHandler } from './collbaoration.handler';

export class CollaborationRoute {
  private collaborationHandler: CollaborationHandler;
  constructor(collaborationHandler: CollaborationHandler) {
    this.collaborationHandler = collaborationHandler;
  }

  routes(): ServerRoute[] {
    return [
      {
        method: 'GET',
        path: '/collaborations',
      },
    ];
  }
}
