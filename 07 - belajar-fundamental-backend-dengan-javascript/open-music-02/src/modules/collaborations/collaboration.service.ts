import { ApiResponse } from '../../common/ApiResponse';
import { serviceContainer } from '../../common/ServiceContainer';
import { PlaylistService } from '../playlists/playlist.service';
import { CreateCollaborationPayloadDto, CreateCollaborationResponseDto } from './collaboration.dto';
import { CollaborationRepository } from './collaboration.repository';

export class CollaborationService {
  private collaborationRepository: CollaborationRepository;

  constructor(collaborationRepository: CollaborationRepository) {
    this.collaborationRepository = collaborationRepository;
  }

  private getPlaylistService(): PlaylistService {
    return serviceContainer.get<PlaylistService>('PlaylistService');
  }

  createCollaboration({ playlistId, userId, userAuthId }: CreateCollaborationPayloadDto) {
    const playlistService = this.getPlaylistService();

    const responseData: CreateCollaborationResponseDto = {
      collaborationId: '',
    };

    return new ApiResponse({ data: responseData });
  }
}
