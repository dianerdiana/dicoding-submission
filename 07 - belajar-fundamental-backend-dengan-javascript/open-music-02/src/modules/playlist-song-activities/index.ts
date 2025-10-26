import { Plugin } from '@hapi/hapi';
import { PlaylistSongActivityRepository } from './playlist-song-activity.repository';
import { PlaylistSongActivityService } from './playlist-song-activity.service';
import { serviceContainer } from '../../common/ServiceContainer';
import { PlaylistSongActivityHandler } from './playlist-song-activity.handler';
import { PlaylistSongActivityRoute } from './playlist-song-activity.route';

export const playlistSongActivityPlugin: Plugin<undefined> = {
  name: 'playlistSongActivities',
  version: '1.0.0',
  // prettier-ignore
  register: async (server) => {
    const playlistSongActivityRepository = new PlaylistSongActivityRepository();
    const playlistSongActivityService = new PlaylistSongActivityService(playlistSongActivityRepository);
    const playlistSongActivityHandler = new PlaylistSongActivityHandler(playlistSongActivityService);
    const playlistSongActivityRoute = new PlaylistSongActivityRoute(playlistSongActivityHandler);

    serviceContainer.register('PlaylistSongActivityService', playlistSongActivityService);
    server.route(playlistSongActivityRoute.routes());
  },
};
