import { Plugin } from '@hapi/hapi';
import { AlbumRepository } from './album.repository';
import { AlbumService } from './album.service';
import { AlbumHandler } from './album.handler';
import { AlbumRoute } from './album.route';
import { serviceContainer } from '../../common/ServiceContainer';

export const albumPlugin: Plugin<undefined> = {
  name: 'albums',
  version: '1.0.0',
  register: async (server) => {
    const albumRepository = new AlbumRepository();
    const albumService = new AlbumService(albumRepository);
    const albumHandler = new AlbumHandler(albumService);
    const albumRoute = new AlbumRoute(albumHandler);

    serviceContainer.register('AlbumService', albumService);
    server.route(albumRoute.routes());
  },
};
