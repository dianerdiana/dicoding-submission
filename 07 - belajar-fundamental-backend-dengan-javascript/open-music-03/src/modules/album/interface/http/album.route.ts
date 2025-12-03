import { ServerRoute } from '@hapi/hapi';
import { AlbumHandler } from './album.handler';
import { MAX_FILE_SIZE } from '../../../../shared/constants/max-file-size.constant';

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
      {
        method: 'POST',
        path: '/albums/{id}/covers',
        options: {
          payload: {
            allow: 'multipart/form-data',
            multipart: true,
            output: 'stream',
            maxBytes: MAX_FILE_SIZE,
          },
        },
        handler: this.albumHandler.uploadAlbumCover,
      },
    ];
  }
}
