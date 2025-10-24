import { ServerRoute } from '@hapi/hapi';
import { SongHandler } from './song.handler';

export class SongRoute {
  private songHandler: SongHandler;

  constructor(songHandler: SongHandler) {
    this.songHandler = songHandler;
  }

  public routes(): ServerRoute[] {
    return [
      {
        method: 'POST',
        path: '/songs',
        handler: this.songHandler.createSong,
      },
      {
        method: 'GET',
        path: '/songs',
        handler: this.songHandler.getAllSongs,
      },
      {
        method: 'GET',
        path: '/songs/{id}',
        handler: this.songHandler.getSongById,
      },
      {
        method: 'PUT',
        path: '/songs/{id}',
        handler: this.songHandler.updateSong,
      },
      {
        method: 'DELETE',
        path: '/songs/{id}',
        handler: this.songHandler.deleteSong,
      },
    ];
  }
}
