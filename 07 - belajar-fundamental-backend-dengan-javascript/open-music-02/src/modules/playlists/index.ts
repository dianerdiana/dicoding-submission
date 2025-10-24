import { Plugin } from '@hapi/hapi';
import { PlaylistRepository } from './playlist.repository';
import { PlaylistService } from './playlist.service';
import { PlaylistHandler } from './playlist.handler';
import { PlaylistRoute } from './playlist.route';
import { serviceContainer } from '../../common/ServiceContainer';

export const playlistPlugin: Plugin<undefined> = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server) => {
    const playlistRepository = new PlaylistRepository();
    const playlistService = new PlaylistService(playlistRepository);
    const playlistHandler = new PlaylistHandler(playlistService);
    const playlistRoute = new PlaylistRoute(playlistHandler);

    serviceContainer.register('PlaylistService', playlistService);
    server.route(playlistRoute.routes());
  },
};
