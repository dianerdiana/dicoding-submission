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
        method: 'GET',
        path: '/albums',
        handler: (req, res) => res.response({ message: 'Hi' }),
      },
    ];
  }
}
