import { PLAYLIST_SONG_ACTIVITY_ACTIONS } from '../../../../shared/constants/playlist-song-activity-actions.constant';
import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { NotFoundError } from '../../../../shared/errors/app-error';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { CreatePlaylistSongActivityUseCase } from '../../../playlist-song-activity/application/use-case/create-playlist-song-activity.use-case';
import { GetPlaylistByIdUseCase } from '../../../playlist/application/use-case/get-playlist-by-id.use-case';
import { GetSongByIdUseCase } from '../../../song/application/use-case/get-song-by-id.use-case';
import { GetUserByIdUseCase } from '../../../user/application/use-case/get-user-by-id.use-case';
import { PlaylistSongRepository } from '../../insfrastructure/playlist-song.repository';
import { AddSongToPlaylistDto } from '../dto/add-song-to-playlist.dto';

export class DeleteSongFromPlaylistUseCase {
  constructor(private readonly playlistSongRepository: PlaylistSongRepository) {}

  async execute(payload: AddSongToPlaylistDto) {
    const getSongByIdUseCase = serviceContainer.get<GetSongByIdUseCase>(
      SERVICE_KEYS.GET_SONG_BY_ID_USE_CASE,
    );
    const getPlaylistByIdUseCase = serviceContainer.get<GetPlaylistByIdUseCase>(
      SERVICE_KEYS.GET_PLAYLIST_BY_ID_USE_CASE,
    );
    const createPlaylistSongActivityUseCase =
      serviceContainer.get<CreatePlaylistSongActivityUseCase>(
        SERVICE_KEYS.CREATE_PLAYLIST_SONG_ACTIVITY_USE_CASE,
      );
    const getUserByIdUseCase = serviceContainer.get<GetUserByIdUseCase>(
      SERVICE_KEYS.GET_USER_BY_ID_USE_CASE,
    );

    const { playlistId, songId, userId } = payload;

    const user = await getUserByIdUseCase.execute(userId);
    const playlist = await getPlaylistByIdUseCase.execute({ playlistId, userId: user.id });
    const song = await getSongByIdUseCase.execute(songId);

    const playlistSong = await this.playlistSongRepository.findByPlaylistAndSongId(
      playlist.id,
      song.id,
    );

    if (!playlistSong) {
      throw new NotFoundError('Song is not found in playlist');
    }

    const playlistSongPrimitive = playlistSong.toPrimitives();
    const deleted = await this.playlistSongRepository.delete(
      playlistSongPrimitive.playlistId,
      playlistSongPrimitive.songId,
    );
    await createPlaylistSongActivityUseCase.execute({
      playlistId: playlist.id,
      songId: song.id,
      userId: user.id,
      action: PLAYLIST_SONG_ACTIVITY_ACTIONS.delete,
    });
    return deleted;
  }
}
