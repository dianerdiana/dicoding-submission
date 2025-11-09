import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { ForbiddenError, NotFoundError } from '../../../../shared/errors/app-error';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { GetUserByIdUseCase } from '../../../user/application/use-case/get-user-by-id.use-case';
import { PlaylistRepository } from '../../infrastructure/playlist.repository';
import { GetPlaylistByIdDto } from '../dto/get-playlist-by-id.dto';

export class GetPlaylistByIdUseCase {
  constructor(private readonly playlistRepository: PlaylistRepository) {}

  async execute(payload: GetPlaylistByIdDto) {
    const { playlistId, userId } = payload;
    const getUserByIdUseCase = serviceContainer.get<GetUserByIdUseCase>(
      SERVICE_KEYS.GET_USER_BY_ID_USE_CASE,
    );

    const playlist = await this.playlistRepository.findById(playlistId);

    if (!playlist) {
      throw new NotFoundError('Playlist is not found');
    }

    const user = await getUserByIdUseCase.execute(userId);

    if (playlist.getOwner() !== user.id) {
      throw new ForbiddenError('Forbidden request');
    }

    const playlistPrimitive = playlist.toPrimitives();
    return {
      id: playlistPrimitive.id,
      name: playlistPrimitive.name,
      username: user.username,
    };
  }
}
