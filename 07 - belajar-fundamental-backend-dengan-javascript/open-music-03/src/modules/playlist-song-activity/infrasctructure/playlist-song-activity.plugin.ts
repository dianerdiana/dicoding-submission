import { Plugin } from '@hapi/hapi';
import { PlaylistSongActivityHandler } from '../interface/http/playlist-song-activity.handler';
import { PlaylistSongActivityRoute } from '../interface/http/playlist-song-activity.route';
import { CreatePlaylistSongActivityUseCase } from '../application/use-case/create-playlist-song-activity.use-case';
import { PlaylistSongActivityRepository } from './playlist-song-activity.repository';
import { serviceContainer } from '../../../shared/utils/service-container';
import { SERVICE_KEYS } from '../../../shared/constants/service-keys.constant';
import { GetAllPlaylistSongActivityByPlaylistIdUseCase } from '../application/use-case/get-all-playlist-song-activity-by-playlist-id.use-case';

export const playlistSongActivityPlugin: Plugin<undefined> = {
  name: 'playlistSongActivities',
  version: '1.0.0',
  register: async (server) => {
    const collaborationRepository = new PlaylistSongActivityRepository();
    const createCollaborationUseCase = new CreatePlaylistSongActivityUseCase(
      collaborationRepository,
    );
    const getAllPlaylistSongActivityByPlaylistIdUseCase =
      new GetAllPlaylistSongActivityByPlaylistIdUseCase(collaborationRepository);
    const collaborationHandler = new PlaylistSongActivityHandler(
      getAllPlaylistSongActivityByPlaylistIdUseCase,
    );

    serviceContainer.register(
      SERVICE_KEYS.CREATE_PLAYLIST_SONG_ACTIVITY_USE_CASE,
      createCollaborationUseCase,
    );
    server.route(new PlaylistSongActivityRoute(collaborationHandler).routes());
  },
};
