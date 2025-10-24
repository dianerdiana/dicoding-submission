import { Plugin } from '@hapi/hapi';
import { SongRepository } from './song.repository';
import { SongService } from './song.service';
import { SongHandler } from './song.handler';
import { SongRoute } from './song.route';
import { serviceContainer } from '../../common/ServiceContainer';

export const songPlugin: Plugin<undefined> = {
  name: 'songs',
  version: '1.0.0',
  register: async (server) => {
    const songRepository = new SongRepository();
    const songService = new SongService(songRepository);
    const songHandler = new SongHandler(songService);
    const songRoute = new SongRoute(songHandler);

    serviceContainer.register('SongService', songService);
    server.route(songRoute.routes());
  },
};
