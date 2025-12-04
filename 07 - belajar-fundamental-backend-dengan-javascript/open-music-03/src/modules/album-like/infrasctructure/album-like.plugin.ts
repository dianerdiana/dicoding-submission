import { Plugin } from '@hapi/hapi';
import { AlbumLikeHandler } from '../interface/http/album-like.handler';
import { AlbumLikeRoute } from '../interface/http/album-like.route';
import { CreateAlbumLikeUseCase } from '../application/use-case/create-album-like.use-case';
import { DeleteAlbumLikeUseCase } from '../application/use-case/delete-album-like.use-case';
import { AlbumLikeRepository } from './album-like.repository';
import { GetAlbumLikeUseCase } from '../application/use-case/get-album-like.use-case';

export const albumLikePlugin: Plugin<undefined> = {
  name: 'albumLikes',
  version: '1.0.0',
  register: async (server) => {
    const albumLikeRepository = new AlbumLikeRepository();
    const createAlbumLikeUseCase = new CreateAlbumLikeUseCase(albumLikeRepository);
    const deleteAlbumLikeUseCase = new DeleteAlbumLikeUseCase(albumLikeRepository);
    const getAlbumLikeUseCase = new GetAlbumLikeUseCase(albumLikeRepository);

    const albumLikeHandler = new AlbumLikeHandler(
      createAlbumLikeUseCase,
      deleteAlbumLikeUseCase,
      getAlbumLikeUseCase,
    );

    server.route(new AlbumLikeRoute(albumLikeHandler).routes());
  },
};
