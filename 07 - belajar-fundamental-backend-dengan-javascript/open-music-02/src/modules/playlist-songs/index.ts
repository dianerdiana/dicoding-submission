import { Plugin } from '@hapi/hapi';
import { PlaylistSongRepository } from './playlist-song.repository';
import { PlaylistSongService } from './playlist-song.service';
import { serviceContainer } from '../../common/ServiceContainer';
import { PlaylistSongHandler } from './playlist-song.handler';
import { PlaylistSongRoute } from './playlist-song.route';

export const playlistSongPlugin: Plugin<undefined> = {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async (server) => {
    const playlistSongRepository = new PlaylistSongRepository();
    const playlistSongService = new PlaylistSongService(playlistSongRepository);
    const playlistSongHandler = new PlaylistSongHandler(playlistSongService);
    const playlistSongRoute = new PlaylistSongRoute(playlistSongHandler);

    serviceContainer.register('PlaylistSongService', playlistSongService);
    server.route(playlistSongRoute.routes());
  },
};
