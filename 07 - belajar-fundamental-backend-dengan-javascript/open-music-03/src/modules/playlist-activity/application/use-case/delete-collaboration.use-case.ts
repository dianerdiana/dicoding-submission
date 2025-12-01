import { ForbiddenError, NotFoundError } from '../../../../shared/errors/app-error';
import { CollaborationRepository } from '../../infrasctructure/collaboration.repository';
import { DeleteCollaborationDto } from '../dto/delete-collaboration.dto';

export class DeleteCollaborationUseCase {
  constructor(private readonly collaborationRepository: CollaborationRepository) {}

  async execute(payload: DeleteCollaborationDto & { authId: string }) {
    const { authId, userId, playlistId } = payload;
    const collaboration = await this.collaborationRepository.findByPlaylistIdAndUserId({
      playlistId,
      userId,
    });

    if (!collaboration) {
      throw new NotFoundError('Collaboration is not found');
    }

    if (authId === userId) {
      throw new ForbiddenError('Forbidden access');
    }

    const deleted = await this.collaborationRepository.delete(collaboration);
    return deleted;
  }
}
