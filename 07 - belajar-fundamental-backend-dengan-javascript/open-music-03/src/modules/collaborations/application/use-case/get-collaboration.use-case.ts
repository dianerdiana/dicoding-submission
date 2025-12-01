import { CollaborationRepository } from '../../infrasctructure/collaboration.repository';
import { GetCollaborationDto } from '../dto/get-collaboration.dto';

export class GetCollaborationUseCase {
  constructor(private readonly collaborationRepository: CollaborationRepository) {}

  async execute(payload: GetCollaborationDto) {
    const { userId, playlistId } = payload;
    const collaboration = await this.collaborationRepository.findByPlaylistIdAndUserId({
      playlistId,
      userId,
    });

    return collaboration;
  }
}
