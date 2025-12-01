import { NotFoundError } from '../../../../shared/errors/app-error';
import { CollaborationRepository } from '../../infrasctructure/collaboration.repository';
import { DeleteCollaborationDto } from '../dto/delete-collaboration.dto';

export class DeleteCollaborationUseCase {
  constructor(private readonly collaborationRepository: CollaborationRepository) {}

  async execute(payload: DeleteCollaborationDto) {
    const { userId, playlistId } = payload;
    const collaboration = await this.collaborationRepository.findByPlaylistIdAndUserId({
      playlistId,
      userId,
    });

    if (!collaboration) {
      throw new NotFoundError('Collaboration is not found');
    }

    const deleted = await this.collaborationRepository.delete(collaboration);
    return deleted;
  }
}
