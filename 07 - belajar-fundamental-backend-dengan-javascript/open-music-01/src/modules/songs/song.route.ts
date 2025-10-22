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
        handler: this.songHandler.postSongs,
      },
      {
        method: 'GET',
        path: '/songs/{id}',
        handler: this.songHandler.getSongs,
      },
      {
        method: 'PUT',
        path: '/songs/{id}',
        handler: this.songHandler.putSongs,
      },
      {
        method: 'DELETE',
        path: '/songs/{id}',
        handler: this.songHandler.deleteSongs,
      },
    ];
  }
}
