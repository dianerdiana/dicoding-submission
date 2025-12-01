import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { GetPlaylistByIdUseCase } from '../../../playlist/application/use-case/get-playlist-by-id.use-case';
import { GetSongByIdUseCase } from '../../../song/application/use-case/get-song-by-id.use-case';
import { GetUserByIdUseCase } from '../../../user/application/use-case/get-user-by-id.use-case';
import { PlaylistSongActivity } from '../../domain/entities/playlist-song-activity.entity';
import { PlaylistSongActivityRepository } from '../../infrasctructure/playlist-song-activity.repository';
import { CreatePlaylistSongActivityDto } from '../dto/create-playlist-song-activity.dto';

export class CreatePlaylistSongActivityUseCase {
  constructor(private readonly playlistSongActivityRepository: PlaylistSongActivityRepository) {}

  async execute(payload: CreatePlaylistSongActivityDto) {
    const { playlistId, songId, userId, action } = payload;

    const getUserByIdUseCase = serviceContainer.get<GetUserByIdUseCase>(
      SERVICE_KEYS.GET_USER_BY_ID_USE_CASE,
    );
    const getPlaylistByIdUseCase = serviceContainer.get<GetPlaylistByIdUseCase>(
      SERVICE_KEYS.GET_PLAYLIST_BY_ID_USE_CASE,
    );
    const getSongByIdUseCase = serviceContainer.get<GetSongByIdUseCase>(
      SERVICE_KEYS.GET_SONG_BY_ID_USE_CASE,
    );

    const user = await getUserByIdUseCase.execute(userId);
    const song = await getSongByIdUseCase.execute(songId);
    const playlist = await getPlaylistByIdUseCase.execute({ playlistId, userId });

    const playlistSongActivity = PlaylistSongActivity.create({
      playlistId: playlist.id,
      songId: song.id,
      userId: user.id,
      action,
    });

    await this.playlistSongActivityRepository.save(playlistSongActivity);
    return playlistSongActivity.toPrimitives().id;
  }
}
