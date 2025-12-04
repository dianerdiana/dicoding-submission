import { ServerRoute } from '@hapi/hapi';
import { AlbumLikeHandler } from './album-like.handler';

export class AlbumLikeRoute {
  private albumLikeHandler: AlbumLikeHandler;

  constructor(albumLikeHandler: AlbumLikeHandler) {
    this.albumLikeHandler = albumLikeHandler;
  }

  public routes(): ServerRoute[] {
    return [
      {
        method: 'POST',
        path: '/albums/{id}/likes',
        handler: this.albumLikeHandler.createAlbumLike,
        options: {
          auth: 'auth_jwt',
        },
      },
      {
        method: 'DELETE',
        path: '/albums/{id}/likes',
        handler: this.albumLikeHandler.deleteAlbumLike,
        options: {
          auth: 'auth_jwt',
        },
      },
      {
        method: 'GET',
        path: '/albums/{id}/likes',
        handler: this.albumLikeHandler.getCountAlbumLike,
      },
    ];
  }
}
