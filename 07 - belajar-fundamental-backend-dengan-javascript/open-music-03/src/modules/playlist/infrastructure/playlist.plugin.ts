import { Plugin } from '@hapi/hapi';
import { PlaylistRepository } from './playlist.repository';
import { CreatePlaylistUseCase } from '../application/use-case/create-playlist.use-case';
import { PlaylistHandler } from '../interface/http/playlist.handler';
import { GetAllPlaylistsUseCase } from '../application/use-case/get-all-playlists.use-case';
import { DeletePlaylistUseCase } from '../application/use-case/delete-playlist.use-case';
import { PlaylistRoute } from '../interface/http/playlist.route';
import { serviceContainer } from '../../../shared/utils/service-container';
import { SERVICE_KEYS } from '../../../shared/constants/service-keys.constant';
import { GetPlaylistByIdUseCase } from '../application/use-case/get-playlist-by-id.use-case';

export const playlistPlugin: Plugin<undefined> = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server) => {
    const playlistRepository = new PlaylistRepository();
    const createPlaylistUseCase = new CreatePlaylistUseCase(playlistRepository);
    const getAllPlaylistsUseCase = new GetAllPlaylistsUseCase(playlistRepository);
    const getPlaylistByIdUseCase = new GetPlaylistByIdUseCase(playlistRepository);
    const deletePlaylistUseCase = new DeletePlaylistUseCase(playlistRepository);
    const playlistHandler = new PlaylistHandler(
      createPlaylistUseCase,
      getAllPlaylistsUseCase,
      deletePlaylistUseCase,
    );

    serviceContainer.register(SERVICE_KEYS.GET_PLAYLIST_BY_ID_USE_CASE, getPlaylistByIdUseCase);
    server.route(new PlaylistRoute(playlistHandler).routes());
  },
};
