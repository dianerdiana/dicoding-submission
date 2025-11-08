import { Plugin } from '@hapi/hapi';
import { PlaylistRepository } from './playlist.repository';
import { CreatePlaylistUseCase } from '../application/use-case/create-playlist.use-case';
import { PlaylistHandler } from '../interface/http/playlist.handler';
import { GetAllPlaylistsUseCase } from '../application/use-case/get-all-playlists.use-case';
import { DeletePlaylistUseCase } from '../application/use-case/delete-playlist.use-case';
import { PlaylistRoute } from '../interface/http/playlist.route';

export const playlistPlugin: Plugin<undefined> = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server) => {
    const playlistRepository = new PlaylistRepository();
    const createPlaylistUseCase = new CreatePlaylistUseCase(playlistRepository);
    const getAllPlaylistsUseCase = new GetAllPlaylistsUseCase(playlistRepository);
    const deletePlaylistUseCase = new DeletePlaylistUseCase(playlistRepository);
    const playlistHandler = new PlaylistHandler(
      createPlaylistUseCase,
      getAllPlaylistsUseCase,
      deletePlaylistUseCase,
    );

    server.route(new PlaylistRoute(playlistHandler).routes());
  },
};
