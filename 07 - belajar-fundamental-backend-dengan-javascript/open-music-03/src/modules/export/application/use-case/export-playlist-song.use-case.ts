import { PlaylistSongExportProducer } from '../../../../app/producers/playlist-song/playlist-song-export.producer';
import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { GetPlaylistByIdUseCase } from '../../../playlist/application/use-case/get-playlist-by-id.use-case';
import { GetPlaylistSongsUseCase } from '../../../playlist-song/application/use-case/get-playlist-songs.use-case';
import { GetUserByIdUseCase } from '../../../user/application/use-case/get-user-by-id.use-case';
import { ExportPlaylistSongDto } from '../dto/export-playlist-song.dto';

export class ExportPlaylistSongsUseCase {
  constructor(private readonly playlistSongExportProducer: PlaylistSongExportProducer) {}

  async execute(payload: { playlistId: string; userId: string } & ExportPlaylistSongDto) {
    const getPlaylistSongsUseCase = serviceContainer.get<GetPlaylistSongsUseCase>(
      SERVICE_KEYS.GET_PLAYLIST_SONGS_USE_CASE,
    );
    const getPlaylistByIdUseCase = serviceContainer.get<GetPlaylistByIdUseCase>(
      SERVICE_KEYS.GET_PLAYLIST_BY_ID_USE_CASE,
    );
    const getUserByIdUseCase = serviceContainer.get<GetUserByIdUseCase>(
      SERVICE_KEYS.GET_USER_BY_ID_USE_CASE,
    );

    const { playlistId, userId, targetEmail } = payload;

    const playlist = await getPlaylistByIdUseCase.execute({ playlistId, userId });
    const user = await getUserByIdUseCase.execute(userId);
    const playlistSongs = await getPlaylistSongsUseCase.execute({
      playlistId: playlist.id,
      userId: user.id,
    });

    await this.playlistSongExportProducer.execute({ playlist: playlistSongs }, targetEmail);

    return playlistSongs;
  }
}
