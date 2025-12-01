import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { GetPlaylistByIdUseCase } from '../../../playlist/application/use-case/get-playlist-by-id.use-case';
import { GetSongsByIdsUseCase } from '../../../song/application/use-case/get-songs-by-ids.use-case';
import { GetUserByIdsUseCase } from '../../../user/application/use-case/get-user-by-ids.use-case';
import { PlaylistSongActivityRepository } from '../../infrasctructure/playlist-song-activity.repository';

export class GetAllPlaylistSongActivityByPlaylistIdUseCase {
  constructor(private readonly playlistSongActivityRepository: PlaylistSongActivityRepository) {}

  async execute(playlistId: string, userId: string) {
    const getUserByIdsUseCase = serviceContainer.get<GetUserByIdsUseCase>(
      SERVICE_KEYS.GET_USER_BY_IDS_USE_CASE,
    );
    const getPlaylistByIdUseCase = serviceContainer.get<GetPlaylistByIdUseCase>(
      SERVICE_KEYS.GET_PLAYLIST_BY_ID_USE_CASE,
    );
    const getAllSongByIdsUseCase = serviceContainer.get<GetSongsByIdsUseCase>(
      SERVICE_KEYS.GET_ALL_SONG_BY_IDS_USE_CASE,
    );

    const playlistSongActivities =
      await this.playlistSongActivityRepository.findAllByPlaylistId(playlistId);
    const songIds = playlistSongActivities.map((playlistSongActivity) =>
      playlistSongActivity.getSongId(),
    );
    const userIds = playlistSongActivities.map((playlistSongActivity) =>
      playlistSongActivity.getUserId(),
    );

    const playlist = await getPlaylistByIdUseCase.execute({ playlistId, userId });
    const songs = await getAllSongByIdsUseCase.execute(songIds);
    const users = await getUserByIdsUseCase.execute(userIds);

    const response = [];

    for (let i = 0; i < playlistSongActivities.length; i++) {
      const playlistSongActivity = playlistSongActivities[i].toPrimitives();
      for (let s = 0; s < songs.length; s++) {
        const song = songs[s];
        for (let u = 0; u < users.length; u++) {
          const user = users[u];
          if (playlistSongActivity.songId === song.id && playlistSongActivity.userId === user.id) {
            response.push({
              username: user.username,
              title: song.title,
              action: playlistSongActivity.action,
              time: playlistSongActivity.time,
            });
          }
        }
      }
    }

    return {
      playlistId: playlist.id,
      activities: response,
    };
  }
}
