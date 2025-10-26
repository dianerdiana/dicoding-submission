import { ServerRoute } from '@hapi/hapi';
import { CollaborationHandler } from './collaboration.handler';

export class CollaborationRoute {
  private collaborationHandler: CollaborationHandler;
  constructor(collaborationHandler: CollaborationHandler) {
    this.collaborationHandler = collaborationHandler;
  }

  routes(): ServerRoute[] {
    return [
      {
        method: 'POST',
        path: '/collaborations',
        handler: this.collaborationHandler.createCollaboration,
        options: {
          auth: 'auth_jwt',
        },
      },
      {
        method: 'DELETE',
        path: '/collaborations',
        handler: this.collaborationHandler.deleteCollaboration,
        options: {
          auth: 'auth_jwt',
        },
      },
    ];
  }
}
