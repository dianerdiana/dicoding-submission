import { Plugin } from '@hapi/hapi';
import { CollaborationRepository } from './collaboration.repository';
import { CollaborationService } from './collaboration.service';
import { serviceContainer } from '../../common/ServiceContainer';
import { CollaborationHandler } from './collaboration.handler';
import { CollaborationRoute } from './collaboration.route';

export const collaborationPlugin: Plugin<undefined> = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (server) => {
    const collaborationRepository = new CollaborationRepository();
    const collaborationService = new CollaborationService(collaborationRepository);
    const collaborationHandler = new CollaborationHandler(collaborationService);
    const collaborationRoute = new CollaborationRoute(collaborationHandler);

    serviceContainer.register('CollaborationService', collaborationService);
    server.route(collaborationRoute.routes());
  },
};
