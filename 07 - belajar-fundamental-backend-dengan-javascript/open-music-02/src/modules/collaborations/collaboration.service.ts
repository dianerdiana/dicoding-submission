import { ApiResponse } from '../../common/ApiResponse';
import { BadRequestError } from '../../common/AppError';
import { serviceContainer } from '../../common/ServiceContainer';
import { PlaylistService } from '../playlists/playlist.service';
import {
  CreateCollaborationPayloadDto,
  CreateCollaborationResponseDto,
  DeleteCollaborationPayloadDto,
  GetAllCollaborationResponseDto,
} from './collaboration.dto';
import { Collaboration } from './collaboration.entity';
import { CollaborationRepository } from './collaboration.repository';

export class CollaborationService {
  private collaborationRepository: CollaborationRepository;

  constructor(collaborationRepository: CollaborationRepository) {
    this.collaborationRepository = collaborationRepository;
  }

  private getPlaylistService(): PlaylistService {
    return serviceContainer.get<PlaylistService>('PlaylistService');
  }

  async createCollaboration({ playlistId, userId, authId }: CreateCollaborationPayloadDto) {
    const playlistService = this.getPlaylistService();
    await playlistService.getOwnPlaylistById({ playlistId, authId });

    const collaboration = new Collaboration({ id: '', playlistId, userId });
    const newCollaboration = await this.collaborationRepository.create(collaboration);

    if (!newCollaboration) throw new BadRequestError('Failed create collaboration');

    const responseData: CreateCollaborationResponseDto = {
      collaborationId: newCollaboration.id,
    };

    return new ApiResponse({ data: responseData, code: 201 });
  }

  async getAllCollaborations(userId: string) {
    const collaborations = await this.collaborationRepository.findByUserId(userId);

    const responseData: GetAllCollaborationResponseDto = { collaborations };
    return new ApiResponse<GetAllCollaborationResponseDto>({ data: responseData });
  }

  async deleteCollaboration({ playlistId, userId, authId }: DeleteCollaborationPayloadDto) {
    const playlistService = this.getPlaylistService();
    await playlistService.getOwnPlaylistById({ playlistId, authId });
    await this.collaborationRepository.delete({ playlistId, userId });

    return new ApiResponse({ message: 'Successfuly deleted collaboration' });
  }
}
