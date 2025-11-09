import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { GetUserByIdsUseCase } from '../../../user/application/use-case/get-user-by-ids.use-case';
import { PlaylistRepository } from '../../infrastructure/playlist.repository';

export class GetAllPlaylistsUseCase {
  constructor(private readonly playlistRepository: PlaylistRepository) {}

  async execute(userId: string) {
    const getUserByIdsUseCase = serviceContainer.get<GetUserByIdsUseCase>(
      SERVICE_KEYS.GET_USER_BY_IDS_USE_CASE,
    );

    const playlists = await this.playlistRepository.findAll(userId);
    const userIds = playlists.map((playlist) => playlist.getOwner());
    const users = await getUserByIdsUseCase.execute(userIds);

    return playlists.map((p) => {
      const playlist = p.toPrimitives();
      const user = users.find((user) => user.id === playlist.owner);

      return {
        id: playlist.id,
        name: playlist.name,
        username: user?.username,
      };
    });
  }
}
