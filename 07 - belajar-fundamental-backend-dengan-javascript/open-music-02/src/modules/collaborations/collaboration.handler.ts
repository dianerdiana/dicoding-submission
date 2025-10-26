import { AuthCredential } from '../../types/AuthCredential';
import { HapiHandler } from '../../types/hapi';
import { validateUUID } from '../../utils/validateUUID';
import { createCollaborationSchema } from './collaboration.schema';
import { CollaborationService } from './collaboration.service';

export class CollaborationHandler {
  private collaborationService: CollaborationService;
  constructor(collaborationService: CollaborationService) {
    this.collaborationService = collaborationService;
  }

  createCollaboration: HapiHandler = async (req) => {
    const { authId } = req.auth.credentials as AuthCredential;
    const payload = await createCollaborationSchema.parseAsync(req.payload);

    validateUUID(payload.playlistId);
    validateUUID(payload.userId);

    const response = await this.collaborationService.createCollaboration({ ...payload, authId });
    return response;
  };

  deleteCollaboration: HapiHandler = async (req) => {
    const { authId } = req.auth.credentials as AuthCredential;
    const payload = await createCollaborationSchema.parseAsync(req.payload);

    validateUUID(payload.playlistId);
    validateUUID(payload.userId);

    const response = await this.collaborationService.deleteCollaboration({ ...payload, authId });
    return response;
  };
}
