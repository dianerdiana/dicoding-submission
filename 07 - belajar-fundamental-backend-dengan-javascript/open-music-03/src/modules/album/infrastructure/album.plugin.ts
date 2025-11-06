import { Plugin } from '@hapi/hapi';
import { AlbumRepository } from './album.repository';
import { AlbumHandler } from '../interface/http/album.handler';
import { AlbumRoute } from '../interface/http/album.route';
import { CreateAlbumUseCase } from '../application/use-case/create-album.use-case';
import { GetAlbumByIdUseCase } from '../application/use-case/get-album-by-id.use-case';
import { UpdateAlbumUseCase } from '../application/use-case/update-album.use-case';
import { DeleteAlbumUseCase } from '../application/use-case/delete-album.use-case';

export const albumPlugin: Plugin<undefined> = {
  name: 'albums',
  version: '1.0.0',
  register: async (server) => {
    const albumRepository = new AlbumRepository();

    const createAlbumUseCase = new CreateAlbumUseCase(albumRepository);
    const getAlbumByIdUseCase = new GetAlbumByIdUseCase(albumRepository);
    const updateAlbumUseCase = new UpdateAlbumUseCase(albumRepository);
    const deleteAlbumUseCase = new DeleteAlbumUseCase(albumRepository);

    const albumHandler = new AlbumHandler(
      createAlbumUseCase,
      getAlbumByIdUseCase,
      updateAlbumUseCase,
      deleteAlbumUseCase,
    );
    const albumRoute = new AlbumRoute(albumHandler);
    server.route(albumRoute.routes());
  },
};
