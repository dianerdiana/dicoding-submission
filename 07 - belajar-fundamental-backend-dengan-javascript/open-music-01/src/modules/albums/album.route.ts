import { ServerRoute } from '@hapi/hapi';
import { AlbumHandler } from './album.handler';

export class AlbumRoute {
  private albumHandler: AlbumHandler;

  constructor(albumHandler: AlbumHandler) {
    this.albumHandler = albumHandler;
  }

  public routes(): ServerRoute[] {
    return [
      {
        method: 'POST',
        path: '/albums',
        handler: this.albumHandler.postAlbums,
      },
      {
        method: 'GET',
        path: '/albums/{id}',
        handler: this.albumHandler.getAlbums,
      },
      {
        method: 'PUT',
        path: '/albums/{id}',
        handler: this.albumHandler.putAlbums,
      },
      {
        method: 'DELETE',
        path: '/albums/{id}',
        handler: this.albumHandler.deleteAlbums,
      },
    ];
  }
}
