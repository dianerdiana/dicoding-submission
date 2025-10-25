import { Plugin } from '@hapi/hapi';
import { PlaylistSongRepository } from './playlist-song.repository';
import { PlaylistSongService } from './playlist-song.service';
import { serviceContainer } from '../../common/ServiceContainer';

export const playlistSongPlugin: Plugin<undefined> = {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async () => {
    const playlistRepository = new PlaylistSongRepository();
    const playlistService = new PlaylistSongService(playlistRepository);

    serviceContainer.register('PlaylistSongService', playlistService);
  },
};
