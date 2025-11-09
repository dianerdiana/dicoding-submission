import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { GetPlaylistByIdUseCase } from '../../../playlist/application/use-case/get-playlist-by-id.use-case';
import { GetSongsByIdsUseCase } from '../../../song/application/use-case/get-songs-by-ids.use-case';
import { PlaylistSongRepository } from '../../insfrastructure/playlist-song.repository';
import { GetPlaylistSongsDto } from '../dto/get-playlist-songs.dto';

export class GetPlaylistSongsUseCase {
  constructor(private readonly playlistSongRepository: PlaylistSongRepository) {}

  async execute(payload: GetPlaylistSongsDto) {
    const getSongsByIdsUseCase = serviceContainer.get<GetSongsByIdsUseCase>(
      SERVICE_KEYS.GET_SONGS_BY_IDS_USE_CASE,
    );
    const getPlaylistByIdUseCase = serviceContainer.get<GetPlaylistByIdUseCase>(
      SERVICE_KEYS.GET_PLAYLIST_BY_ID_USE_CASE,
    );

    const { playlistId, userId } = payload;
    const playlist = await getPlaylistByIdUseCase.execute({ playlistId, userId });
    const playlistSongs = await this.playlistSongRepository.findAllByPlaylistId(playlist.id);
    const songIds = playlistSongs.map((playlistSong) => playlistSong.getSongId());
    const songs = await getSongsByIdsUseCase.execute(songIds);

    return {
      ...playlist,
      songs,
    };
  }
}
