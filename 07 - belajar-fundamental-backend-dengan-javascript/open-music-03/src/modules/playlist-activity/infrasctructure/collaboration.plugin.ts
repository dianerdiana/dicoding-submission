import { Plugin } from '@hapi/hapi';
import { CollaborationHandler } from '../interface/http/collaboration.handler';
import { CollaborationRoute } from '../interface/http/collaboration.route';
import { CreateCollaborationUseCase } from '../application/use-case/create-collaboration.use-case';
import { DeleteCollaborationUseCase } from '../application/use-case/delete-collaboration.use-case';
import { CollaborationRepository } from './collaboration.repository';
import { serviceContainer } from '../../../shared/utils/service-container';
import { SERVICE_KEYS } from '../../../shared/constants/service-keys.constant';
import { GetCollaborationUseCase } from '../application/use-case/get-collaboration.use-case';
import { GetAllCollaborationByUserIdUseCase } from '../application/use-case/get-all-collaboration-by-user-id.use-case';

export const collaborationPlugin: Plugin<undefined> = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (server) => {
    const collaborationRepository = new CollaborationRepository();
    const createCollaborationUseCase = new CreateCollaborationUseCase(collaborationRepository);
    const deleteCollaborationUseCase = new DeleteCollaborationUseCase(collaborationRepository);
    const getAllCollaborationUseCase = new GetAllCollaborationByUserIdUseCase(
      collaborationRepository,
    );
    const getCollaborationUseCase = new GetCollaborationUseCase(collaborationRepository);
    const collaborationHandler = new CollaborationHandler(
      createCollaborationUseCase,
      deleteCollaborationUseCase,
    );

    serviceContainer.register(
      SERVICE_KEYS.GET_ALL_COLLABORATION_BY_USER_ID_USE_CASE,
      getAllCollaborationUseCase,
    );
    serviceContainer.register(SERVICE_KEYS.GET_COLLABORATION_USE_CASE, getCollaborationUseCase);
    server.route(new CollaborationRoute(collaborationHandler).routes());
  },
};
