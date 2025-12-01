import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { GetPlaylistByIdUseCase } from '../../../playlist/application/use-case/get-playlist-by-id.use-case';
import { GetUserByIdUseCase } from '../../../user/application/use-case/get-user-by-id.use-case';
import { Collaboration } from '../../domain/entities/collaboration.entity';
import { CollaborationRepository } from '../../infrasctructure/collaboration.repository';
import { CreateCollaborationDto } from '../dto/create-collaboration.dto';

export class CreateCollaborationUseCase {
  constructor(private readonly collaborationRepository: CollaborationRepository) {}

  async execute(payload: CreateCollaborationDto & { authId: string }) {
    const { authId, userId, playlistId } = payload;

    const getUserByIdUseCase = serviceContainer.get<GetUserByIdUseCase>(
      SERVICE_KEYS.GET_USER_BY_ID_USE_CASE,
    );
    const getPlaylistByIdUseCase = serviceContainer.get<GetPlaylistByIdUseCase>(
      SERVICE_KEYS.GET_PLAYLIST_BY_ID_USE_CASE,
    );

    const user = await getUserByIdUseCase.execute(userId);
    const playlist = await getPlaylistByIdUseCase.execute({ playlistId, userId: authId });

    const collaboration = Collaboration.create({ playlistId: playlist.id, userId: user.id });

    await this.collaborationRepository.save(collaboration);
    return collaboration.toPrimitives().id;
  }
}
