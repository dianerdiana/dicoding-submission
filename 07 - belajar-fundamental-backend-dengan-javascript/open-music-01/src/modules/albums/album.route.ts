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
        handler: this.albumHandler.createAlbum,
      },
      {
        method: 'GET',
        path: '/albums/{id}',
        handler: this.albumHandler.getAlbumById,
      },
      {
        method: 'PUT',
        path: '/albums/{id}',
        handler: this.albumHandler.updateAlbum,
      },
      {
        method: 'DELETE',
        path: '/albums/{id}',
        handler: this.albumHandler.deleteAlbum,
      },
    ];
  }
}
