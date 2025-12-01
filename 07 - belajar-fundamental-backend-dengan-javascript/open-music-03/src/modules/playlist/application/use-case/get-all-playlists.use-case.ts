import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { GetAllCollaborationByUserIdUseCase } from '../../../collaborations/application/use-case/get-all-collaboration-by-user-id.use-case';
import { GetUserByIdsUseCase } from '../../../user/application/use-case/get-user-by-ids.use-case';
import { PlaylistRepository } from '../../infrastructure/playlist.repository';

export class GetAllPlaylistsUseCase {
  constructor(private readonly playlistRepository: PlaylistRepository) {}

  async execute(userId: string) {
    const getUserByIdsUseCase = serviceContainer.get<GetUserByIdsUseCase>(
      SERVICE_KEYS.GET_USER_BY_IDS_USE_CASE,
    );
    const getAllCollaborationUseCase = serviceContainer.get<GetAllCollaborationByUserIdUseCase>(
      SERVICE_KEYS.GET_ALL_COLLABORATION_BY_USER_ID_USE_CASE,
    );

    const collaborations = await getAllCollaborationUseCase.execute(userId);
    const playlistIds = collaborations.map((collaboration) => collaboration.playlistId);

    const collaborationPlaylists = await this.playlistRepository.findAllByIds(playlistIds);
    const ownPlaylists = await this.playlistRepository.findAll(userId);

    const allPlaylists = [...collaborationPlaylists, ...ownPlaylists];

    const userIds = allPlaylists.map((playlist) => playlist.getOwner());
    const users = await getUserByIdsUseCase.execute(userIds);

    const response = [];

    for (let p = 0; p < allPlaylists.length; p++) {
      const playlist = allPlaylists[p].toPrimitives();
      for (let u = 0; u < users.length; u++) {
        const user = users[u];

        if (playlist.owner === user.id) {
          response.push({
            id: playlist.id,
            name: playlist.name,
            username: user.username,
          });
        }
      }
    }

    return response;
  }
}
