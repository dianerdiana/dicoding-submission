import { ServerRoute } from '@hapi/hapi';
import { SongHandler } from './song.handler';

export class SongRoute {
  private albumHandler: SongHandler;

  constructor(albumHandler: SongHandler) {
    this.albumHandler = albumHandler;
  }

  public routes(): ServerRoute[] {
    return [
      {
        method: 'POST',
        path: '/songs',
        handler: this.albumHandler.createSong,
      },
      {
        method: 'GET',
        path: '/songs',
        handler: this.albumHandler.getAllSongs,
      },
      {
        method: 'GET',
        path: '/songs/{id}',
        handler: this.albumHandler.getSongById,
      },
      {
        method: 'PUT',
        path: '/songs/{id}',
        handler: this.albumHandler.updateSong,
      },
      {
        method: 'DELETE',
        path: '/songs/{id}',
        handler: this.albumHandler.deleteSong,
      },
    ];
  }
}
