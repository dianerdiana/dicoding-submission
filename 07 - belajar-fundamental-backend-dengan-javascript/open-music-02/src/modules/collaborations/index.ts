import { Plugin } from '@hapi/hapi';
import { CollaborationRepository } from './collaboration.repository';
import { CollaborationService } from './collaboration.service';
import { serviceContainer } from '../../common/ServiceContainer';

export const collaborationPlugin: Plugin<undefined> = {
  name: 'collaborations',
  version: '1.0.0',
  register: async () => {
    const collaborationRepository = new CollaborationRepository();
    const collaborationService = new CollaborationService(collaborationRepository);

    serviceContainer.register('CollaborationService', collaborationService);
  },
};
